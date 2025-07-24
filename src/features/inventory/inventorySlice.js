// =======================================================================
// FILE: src/features/inventory/inventorySlice.js (CHANGED)
// =======================================================================
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

const initialState = {
    items: [],
    status: 'idle',
    error: null,
};

export const fetchInventory = createAsyncThunk('inventory/fetch', async (storeId, { rejectWithValue }) => {
    if (!storeId) return [];
    try {
        const response = await api.get(`/inventory/?store_id=${storeId}`);
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
            });
    },
});

export default inventorySlice.reducer;
