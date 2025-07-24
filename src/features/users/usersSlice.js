// =======================================================================
// FILE: src/features/usersSlice.js (EDITED)
// =======================================================================
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api.js';

const initialState = {
  inviteStatus: 'idle',
  manageStatus: 'idle',
  error: null,
};

export const inviteUser = createAsyncThunk('users/invite', async (inviteData, { rejectWithValue }) => {
  try {
    const response = await api.post('/auth/invite/', inviteData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const manageStaff = createAsyncThunk('users/manage', async ({ userId, isActive }, { rejectWithValue }) => {
    try {
        const response = await api.patch(`/auth/staff/${userId}/manage/`, { is_active: isActive });
        return { userId, isActive };
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const deleteStaff = createAsyncThunk('users/delete', async (userId, { rejectWithValue }) => {
    try {
        await api.delete(`/auth/staff/${userId}/manage/`);
        return userId;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetInviteStatus: (state) => {
        state.inviteStatus = 'idle';
        state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(inviteUser.pending, (state) => { state.inviteStatus = 'loading'; })
      .addCase(inviteUser.fulfilled, (state) => { state.inviteStatus = 'succeeded'; })
      .addCase(inviteUser.rejected, (state, action) => {
        state.inviteStatus = 'failed';
        state.error = action.payload;
      })
      .addCase(manageStaff.pending, (state) => { state.manageStatus = 'loading'; })
      .addCase(manageStaff.fulfilled, (state) => { state.manageStatus = 'succeeded'; })
      .addCase(manageStaff.rejected, (state, action) => {
        state.manageStatus = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteStaff.pending, (state) => { state.manageStatus = 'loading'; })
      .addCase(deleteStaff.fulfilled, (state) => { state.manageStatus = 'succeeded'; })
      .addCase(deleteStaff.rejected, (state, action) => {
        state.manageStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetInviteStatus } = usersSlice.actions;
export default usersSlice.reducer;
