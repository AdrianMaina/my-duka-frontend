// =======================================================================
// FILE: src/app/store.js (EDITED)
// =======================================================================
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.js';
import storesReducer from '../features/stores/storesSlice';
import usersReducer from '../features/users/usersSlice.js';
import inventoryReducer from '../features/inventory/inventorySlice.js';
import paymentsReducer from '../features/PaymentSlice';
import dashboardReducer from '../features/dashboardSlice';
import clerkReducer from '../features/clerkSlice.js';
import adminReducer from '../features/adminSlice.js'; // NEW

export const store = configureStore({
  reducer: {
    auth: authReducer,
    stores: storesReducer,
    users: usersReducer,
    inventory: inventoryReducer,
    payments: paymentsReducer,
    dashboard: dashboardReducer,
    clerk: clerkReducer,
    admin: adminReducer,
  },
});