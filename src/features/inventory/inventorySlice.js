// =======================================================================
// FILE: src/features/inventorySlice.js (EDITED)
// =======================================================================
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api.js';

const initialState = {
    items: [],
    stockReceives: [],
    status: 'idle',
    error: null,
};

export const fetchInventory = createAsyncThunk('inventory/fetch', async (storeId, { rejectWithValue }) => {
    if (!storeId) return [];
    try {
        const response = await api.get(`/inventory/?store=${storeId}`);
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const addInventoryItem = createAsyncThunk('inventory/addItem', async (itemData, { rejectWithValue }) => {
    try {
        const response = await api.post('/inventory/', itemData);
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const updateInventoryItem = createAsyncThunk('inventory/updateItem', async (itemData, { rejectWithValue }) => {
    try {
        const { id, ...data } = itemData;
        const response = await api.patch(`/inventory/${id}/`, data);
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const deleteInventoryItem = createAsyncThunk('inventory/deleteItem', async (itemId, { rejectWithValue }) => {
    try {
        await api.delete(`/inventory/${itemId}/`);
        return itemId;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const fetchStockReceives = createAsyncThunk('inventory/fetchStockReceives', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/stock-receive/');
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

export const markAsPaid = createAsyncThunk('inventory/markAsPaid', async (stockReceiveId, { rejectWithValue }) => {
    try {
        const response = await api.patch(`/stock-receive/${stockReceiveId}/mark-as-paid/`);
        return response.data;
    } catch (err) {
        return rejectWithValue(err.response.data);
    }
});

const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchInventory.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchInventory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchInventory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addInventoryItem.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateInventoryItem.fulfilled, (state, action) => {
                const index = state.items.findIndex(item => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = action.payload;
                }
            })
            .addCase(deleteInventoryItem.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.id !== action.payload);
            })
            .addCase(fetchStockReceives.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchStockReceives.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.stockReceives = action.payload;
            })
            .addCase(fetchStockReceives.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(markAsPaid.fulfilled, (state, action) => {
                const index = state.stockReceives.findIndex(sr => sr.id === action.payload.id);
                if (index !== -1) {
                    state.stockReceives[index] = action.payload;
                }
            });
    },
});

export default inventorySlice.reducer;
