//=======================================================================
// FILE: src/pages/clerk/ClerkOverview.jsx (EDITED)
// =======================================================================
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/ui/Card';
import { fetchClerkOverview } from '../../features/dashboardSlice';

const ClerkOverview = () => {
    const dispatch = useDispatch();
    const { clerkOverview, status } = useSelector(state => state.dashboard) || {};

useEffect(() => {
    dispatch(fetchClerkOverview());
}, [dispatch]);

return (
    <div>
        <h2 className="text-3xl font-bold mb-6">Clerk Dashboard</h2>
        {status === 'loading' && <p>Loading dashboard...</p>}
        {status === 'succeeded' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card title="Total Items Received (Today)">
                    <p className="text-4xl font-bold text-primary-blue">{clerkOverview.itemsReceived}</p>
                </Card>
                <Card title="Low Stock Items">
                    <p className="text-4xl font-bold text-yellow-500">{clerkOverview.lowStockItems}</p>
                </Card>
                <Card title="Spoilage Incidents (Week)">
                    <p className="text-4xl font-bold text-alert-red">{clerkOverview.spoilageCount}</p>
                </Card>
                <Card title="Pending Supply Requests">
                    <p className="text-4xl font-bold">{clerkOverview.pendingRequests}</p>
                </Card>
            </div>
        )}
    </div>
);
};

export default ClerkOverview;