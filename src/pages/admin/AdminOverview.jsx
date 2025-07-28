=======================================================================
// FILE: src/pages/admin/AdminOverview.jsx (Updated with live data)
// =======================================================================
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/ui/Card';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchAdminOverview } from '../../features/dashboardSlice';

const AdminOverview = () => {
    const dispatch = useDispatch();
    const { adminOverview, status } = useSelector(state => state.dashboard) || {};

useEffect(() => {
    dispatch(fetchAdminOverview());
}, [dispatch]);

return (
    <div>
        <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
        {status === 'loading' && <p>Loading dashboard...</p>}
        {status === 'succeeded' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Stock Trends">
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={adminOverview.stockTrendsData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="stock" stroke="#0077B6" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>
                <Card title="Spoilage Patterns">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={adminOverview.spoilageData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="reason" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#E63946" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card>
            </div>
        )}
    </div>
);
};

export default AdminOverview;