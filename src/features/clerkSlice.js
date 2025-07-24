// =======================================================================
// FILE: src/features/clerkSlice.js
// =======================================================================
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api.js';

const initialState = {
    approvedRequests: [],
    status: 'idle',
    error: null,
};

export const fetchApprovedRequests = createAsyncThunk('clerk/fetchApproved', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/approved-supply-requests/');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const confirmDelivery = createAsyncThunk('clerk/confirmDelivery', async ({ id, phone }, { rejectWithValue }) => {
    try {
        const response = await api.post(`/supply-requests/${id}/confirm-delivery/`, { supplier_phone_number: phone });
        return { ...response.data, id }; // Pass id to the reducer to identify which request was confirmed
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const receiveStock = createAsyncThunk('clerk/receiveStock', async (data, { rejectWithValue }) => {
    try {
        const response = await api.post('/stock-receive/', data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const logSpoilage = createAsyncThunk('clerk/logSpoilage', async (data, { rejectWithValue }) => {
    try {
        const response = await api.post('/spoilage/', data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const requestStock = createAsyncThunk('clerk/requestStock', async (data, { rejectWithValue }) => {
    try {
        const response = await api.post('/supply-requests/', data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const recordSale = createAsyncThunk('clerk/recordSale', async (data, { rejectWithValue }) => {
    try {
        const response = await api.post('/sales/', data);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const clerkSlice = createSlice({
    name: 'clerk',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Cases for fetching the list of approved requests for the "Receive Stock" page
            .addCase(fetchApprovedRequests.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchApprovedRequests.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.approvedRequests = action.payload;
            })
            .addCase(fetchApprovedRequests.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            // Case for confirming a delivery
            .addCase(confirmDelivery.fulfilled, (state, action) => {
                // Remove the confirmed request from the list for an instant UI update
                state.approvedRequests = state.approvedRequests.filter(req => req.id !== action.payload.id);
            })
            // Generic cases for other form submissions
            .addCase(receiveStock.pending, (state) => { state.status = 'loading'; })
            .addCase(receiveStock.fulfilled, (state) => { state.status = 'succeeded'; })
            .addCase(receiveStock.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(logSpoilage.pending, (state) => { state.status = 'loading'; })
            .addCase(logSpoilage.fulfilled, (state) => { state.status = 'succeeded'; })
            .addCase(logSpoilage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(requestStock.pending, (state) => { state.status = 'loading'; })
            .addCase(requestStock.fulfilled, (state) => { state.status = 'succeeded'; })
            .addCase(requestStock.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(recordSale.pending, (state) => { state.status = 'loading'; })
            .addCase(recordSale.fulfilled, (state) => { state.status = 'succeeded'; })
            .addCase(recordSale.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default clerkSlice.reducer;
