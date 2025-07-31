// =======================================================================
// FILE: src/features/dashboardSlice.js (FIXED)
// =======================================================================
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api.js';

const initialState = {
    overview: {},
    staff: [],
    salesData: [],
    adminOverview: { spoilageData: [], stockTrendsData: [] },
    clerkOverview: { itemsReceived: 0, lowStockItems: 0, spoilageCount: 0, pendingRequests: 0 },
    status: 'idle',
    error: null,
};

export const fetchDashboardData = createAsyncThunk('dashboard/fetchData', async (storeId, { rejectWithValue }) => {
    if (!storeId) return null;
    try {
        const response = await api.get(`/reports/overview/${storeId}/`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchStaffList = createAsyncThunk('dashboard/fetchStaff', async (storeId, { rejectWithValue }) => {
    if (!storeId) return [];
    try {
        const response = await api.get(`/reports/staff-list/${storeId}/`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchSalesData = createAsyncThunk('dashboard/fetchSales', async (storeId, { rejectWithValue }) => {
    if (!storeId) return [];
    try {
        const response = await api.get(`/reports/sales-chart/${storeId}/`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchAdminOverview = createAsyncThunk('dashboard/fetchAdminOverview', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/reports/admin-overview/');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchClerkOverview = createAsyncThunk('dashboard/fetchClerkOverview', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/reports/clerk-overview/');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardData.fulfilled, (state, action) => {
                state.overview = action.payload;
            })
            .addCase(fetchStaffList.pending, (state) => { // ADDED
                state.status = 'loading';
            })
            .addCase(fetchStaffList.fulfilled, (state, action) => { // ADDED
                state.status = 'succeeded';
                state.staff = action.payload;
            })
            .addCase(fetchStaffList.rejected, (state, action) => { // ADDED
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchSalesData.fulfilled, (state, action) => {
                state.salesData = action.payload;
            })
            .addCase(fetchAdminOverview.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchAdminOverview.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.adminOverview = action.payload;
            })
            .addCase(fetchAdminOverview.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchClerkOverview.pending, (state) => { state.status = 'loading'; })
            .addCase(fetchClerkOverview.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.clerkOverview = action.payload;
            })
            .addCase(fetchClerkOverview.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default dashboardSlice.reducer;
