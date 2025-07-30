// =======================================================================
// FILE: src/features/paymentsSlice.js (EDITED)
// =======================================================================
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api.js';
import toast from 'react-hot-toast'; // NEW IMPORT

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
        const response = await api.get(`/payments/unpaid-deliveries/?store_id=${storeId}`);
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const payWithMpesa = createAsyncThunk('payments/pay', async (paymentData, { rejectWithValue }) => {
    try {
        const response = await api.post('/payments/pay-supplier/', paymentData);
        return { ...response.data, stock_receive_id: paymentData.stock_receive_id };
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
            .addCase(payWithMpesa.pending, (state) => { state.status = 'loading'; })
            .addCase(payWithMpesa.fulfilled, (state, action) => {
                state.status = 'succeeded';
                toast.success('STK Push initiated successfully!'); // REPLACED alert()
                state.unpaidDeliveries = state.unpaidDeliveries.filter(
                    delivery => delivery.id !== action.payload.stock_receive_id
                );
            })
            .addCase(payWithMpesa.rejected, (state, action) => {
                state.status = 'failed';
                const errorMessage = action.payload?.error || 'Payment initiation failed.';
                toast.error(errorMessage); // REPLACED alert()
            });
    },
});

export default paymentsSlice.reducer;
