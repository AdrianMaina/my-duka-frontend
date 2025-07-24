// =======================================================================
// FILE: src/features/storesSlice.js (EDITED)
// =======================================================================
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api.js';

const activeStoreFromStorage = JSON.parse(localStorage.getItem('activeStore'));

const initialState = {
    stores: [],
    activeStore: activeStoreFromStorage || null,
    status: 'idle',
    error: null,
};

export const fetchStores = createAsyncThunk('stores/fetchStores', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/stores/');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const addStore = createAsyncThunk('stores/addStore', async (storeData, { rejectWithValue }) => {
    try {
        const response = await api.post('/stores/', storeData);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const storesSlice = createSlice({
    name: 'stores',
    initialState,
    reducers: {
        setActiveStore: (state, action) => {
            state.activeStore = action.payload;
            localStorage.setItem('activeStore', JSON.stringify(action.payload));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStores.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchStores.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.stores = action.payload;
                // Only set the first store as active if there isn't one already set
                if (!state.activeStore && action.payload.length > 0) {
                    state.activeStore = action.payload[0];
                    localStorage.setItem('activeStore', JSON.stringify(action.payload[0]));
                }
            })
            .addCase(fetchStores.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(addStore.fulfilled, (state, action) => {
                state.stores.push(action.payload);
                // When a new store is added, make it the active one.
                state.activeStore = action.payload;
                localStorage.setItem('activeStore', JSON.stringify(action.payload));
            });
    },
});

export const { setActiveStore } = storesSlice.actions;
export default storesSlice.reducer;
