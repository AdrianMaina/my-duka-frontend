// =======================================================================
// FILE: src/features/authSlice.js (FIXED)
// =======================================================================
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api.js';
import jwt_decode from 'jwt-decode';

const storedUser = JSON.parse(localStorage.getItem('user'));
const storedToken = localStorage.getItem('token');

const initialState = {
  user: storedUser || null,
  token: storedToken || null,
  status: 'idle',
  error: null,
  isLoaded: false,
};

export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
    try {
        await api.post('/auth/register/', userData);
        const loginResponse = await api.post('/auth/login/', { username: userData.username, password: userData.password });
        const { access: token } = loginResponse.data;
        localStorage.setItem('token', token);
        
        const userDetailsResponse = await api.get('/auth/user/');
        const user = userDetailsResponse.data;

        localStorage.setItem('user', JSON.stringify(user));
        return { user, token };
    } catch (error) {
        localStorage.clear();
        return rejectWithValue(error.response.data);
    }
});

export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, { rejectWithValue }) => {
  try {
    const loginCredentials = {
        username: credentials.email,
        password: credentials.password
    };
    const loginResponse = await api.post('/auth/login/', loginCredentials);
    const { access: token } = loginResponse.data;
    localStorage.setItem('token', token);

    const userDetailsResponse = await api.get('/auth/user/');
    const user = userDetailsResponse.data;

    localStorage.setItem('user', JSON.stringify(user));
    return { user, token };
  } catch (error) {
    localStorage.clear();
    return rejectWithValue(error.response.data);
  }
});

export const completeInvite = createAsyncThunk('auth/completeInvite', async (data, { rejectWithValue }) => {
    try {
        const response = await api.post('/auth/complete-invite/', data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.clear();
    },
    authLoaded: (state) => {
        state.isLoaded = true;
    },
    setAuth: (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => { state.status = 'loading'; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => { state.status = 'loading'; })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(completeInvite.pending, (state) => { state.status = 'loading'; })
      .addCase(completeInvite.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(completeInvite.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout, authLoaded, setAuth } = authSlice.actions;

export const initializeAuth = () => (dispatch) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token && user) {
        dispatch(setAuth({ user, token }));
    }
    dispatch(authLoaded());
};

export default authSlice.reducer;
