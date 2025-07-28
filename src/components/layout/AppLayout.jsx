// =======================================================================
// FILE: src/components/layout/AppLayout.jsx (UPDATED)
// =======================================================================
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import Header from './Header';
import { fetchStores } from '../../features/stores/storesSlice';

const AppLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const storesState = useSelector((state) => state.stores);
    const storesStatus = storesState?.status ?? 'idle';

    // Fetch stores when the layout mounts for a merchant
    useEffect(() => {
        if (user?.role === 'merchant' && storesStatus === 'idle') {
            console.log('Dispatching fetchStores()...');
            dispatch(fetchStores());
        }
    }, [user, storesStatus, dispatch]);

    return (
        <div className="flex min-h-screen bg-soft-gray">
            <Sidebar isOpen={isSidebarOpen} toggle={() => setSidebarOpen(false)} />
            <div className="flex-1 flex flex-col">
                <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
                <main className="flex-1 p-4 sm:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
