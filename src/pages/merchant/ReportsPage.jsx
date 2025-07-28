// =======================================================================
// FILE: src/pages/merchant/ReportsPage.jsx (Updated with live data)
// =======================================================================
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../../components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchDashboardData, fetchSalesData } from '../../features/dashboardSlice';
import NoStorePlaceholder from '../../components/ui/NoStorePlaceholder';

const ReportsPage = () => {
    const dispatch = useDispatch();
    const { activeStore } = useSelector(state => state.stores) || {};
    const { overview, salesData, status } = useSelector(state => state.dashboard) || {};

    useEffect(() => {
        if (activeStore) {
            dispatch(fetchDashboardData(activeStore.id));
            dispatch(fetchSalesData(activeStore.id));
        }
    }, [activeStore, dispatch]);

    if (!activeStore) {
        return <NoStorePlaceholder pageTitle="Reports" />;
    }

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Reports for: <span className="text-primary-blue">{activeStore.name}</span></h2>
            
            {status === 'loading' && <p>Loading reports...</p>}

            {status === 'succeeded' && overview && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card title="Monthly Sales (KES)"><p className="text-4xl font-bold text-support-green">{overview.monthlySales?.toLocaleString() || 0}</p></Card>
                        <Card title="Pending Payments"><p className="text-4xl font-bold text-alert-red">{overview.pendingPayments || 0}</p></Card>
                        <Card title="Total Staff"><p className="text-4xl font-bold">{overview.totalStaff || 0}</p></Card>
                    </div>

                    <Card title="Sales Last 7 Days" className="mt-8">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={salesData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Sales" fill="#0077B6" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Card>
                </>
            )}
        </div>
    );
};

export default ReportsPage;
