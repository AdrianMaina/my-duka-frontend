// =======================================================================
// FILE: src/features/paymentsSlice.js (FIXED)
// =======================================================================
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api.js';

const initialState = {
    transactions: [],
    unpaidDeliveries: [],
    status: 'idle',
    error: null,
};

export const fetchMpesaTransactions = createAsyncThunk('payments/fetchTransactions', async (storeId, { rejectWithValue }) => {
    if (!storeId) return [];
    try {
        const response = await api.get(`/payments/transactions/?store_id=${storeId}`);
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const fetchUnpaidDeliveries = createAsyncThunk('payments/fetchUnpaid', async (storeId, { rejectWithValue }) => {
    if (!storeId) return [];
    try {
        // This endpoint would need to be created on the backend
        const response = await api.get(`/payments/unpaid-deliveries/?store_id=${storeId}`);
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const payWithMpesa = createAsyncThunk('payments/pay', async (paymentData, { rejectWithValue }) => {
    try {
        // This endpoint would need to be created on the backend
        const response = await api.post('/payments/pay-supplier/', paymentData);
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});


const paymentsSlice = createSlice({
    name: 'payments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMpesaTransactions.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchMpesaTransactions.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.transactions = action.payload;
            })
            .addCase(fetchMpesaTransactions.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchUnpaidDeliveries.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchUnpaidDeliveries.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.unpaidDeliveries = action.payload;
            })
            .addCase(fetchUnpaidDeliveries.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(payWithMpesa.fulfilled, (state, action) => {
                alert('Payment initiated successfully!');
                // Remove the paid item from the list
                state.unpaidDeliveries = state.unpaidDeliveries.filter(
                    delivery => delivery.id !== action.payload.stock_receive_id
                );
            })
            .addCase(payWithMpesa.rejected, (state, action) => {
                alert(`Payment failed: ${action.payload.error || 'Unknown error'}`);
            });
    },
});

export default paymentsSlice.reducer;
