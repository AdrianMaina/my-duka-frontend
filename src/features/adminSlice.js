// =======================================================================
// FILE: src/features/adminSlice.js (FIXED)
// =======================================================================
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api.js';

const initialState = {
    requests: [],
    status: 'idle',
    error: null,
};

export const fetchSupplyRequests = createAsyncThunk('admin/fetchSupplyRequests', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/supply-requests/');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateSupplyRequest = createAsyncThunk('admin/updateSupplyRequest', async ({ id, status }, { rejectWithValue }) => {
    try {
        const response = await api.patch(`/supply-requests/${id}/`, { status });
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSupplyRequests.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchSupplyRequests.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.requests = action.payload;
            })
            .addCase(fetchSupplyRequests.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(updateSupplyRequest.fulfilled, (state, action) => {
                // Safely handle the payload, whether it's an object or an array with one object
                const updatedRequest = Array.isArray(action.payload) ? action.payload[0] : action.payload;
                
                if (updatedRequest) {
                    const index = state.requests.findIndex(req => req.id === updatedRequest.id);
                    if (index !== -1) {
                        state.requests[index] = { ...state.requests[index], ...updatedRequest };
                    }
                }
            });
    },
});

export default adminSlice.reducer;
