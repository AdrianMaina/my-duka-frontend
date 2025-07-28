// =======================================================================
// FILE: src/pages/admin/SupplyRequestsPage.jsx (FIXED)
// =======================================================================
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/ui/Card';
import { fetchSupplyRequests, updateSupplyRequest } from '../../features/adminSlice';

const StatusBadge = ({ status }) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-semibold capitalize";
    if (status === 'pending') return <span className={`${baseClasses} bg-yellow-100 text-yellow-700`}>Pending</span>;
    if (status === 'approved') return <span className={`${baseClasses} bg-green-100 text-green-700`}>Approved</span>;
    if (status === 'declined') return <span className={`${baseClasses} bg-red-100 text-red-700`}>Declined</span>;
    return null;
};

const SupplyRequestsPage = () => {
    const dispatch = useDispatch();
    const { requests, status } = useSelector(state => state.admin) || {};

    useEffect(() => {
        dispatch(fetchSupplyRequests());
    }, [dispatch]);

    const handleUpdate = (id, newStatus) => {
        dispatch(updateSupplyRequest({ id, status: newStatus })).then((result) => {
            if (updateSupplyRequest.fulfilled.match(result)) {
                // After the update is successful, re-fetch the list to ensure UI is in sync.
                dispatch(fetchSupplyRequests());
            }
        });
    };
    
    return (
        <Card title="Supply Requests">
            {status === 'loading' && <p>Loading requests...</p>}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-soft-gray">
                            <th className="p-3 font-semibold">Requested On</th>
                            <th className="p-3 font-semibold">Product</th>
                            <th className="p-3 font-semibold">Quantity</th>
                            <th className="p-3 font-semibold">Requested By</th>
                            <th className="p-3 font-semibold">Status & Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests && requests.map(req => (
                            <tr key={req.id} className="border-b">
                                <td className="p-3">{new Date(req.requested_at).toLocaleDateString()}</td>
                                <td className="p-3">{req.inventory_item_name || 'N/A'}</td>
                                <td className="p-3">{req.quantity_requested}</td>
                                <td className="p-3">{req.requested_by_name || 'N/A'}</td>
                                <td className="p-3">
                                    <div className="flex flex-col items-start gap-2">
                                        <StatusBadge status={req.status} />
                                        {req.status === 'pending' && (
                                            <div className="flex gap-2">
                                                <button onClick={() => handleUpdate(req.id, 'approved')} className="bg-support-green text-white px-3 py-1 rounded text-xs hover:bg-green-700">Approve</button>
                                                <button onClick={() => handleUpdate(req.id, 'declined')} className="bg-alert-red text-white px-3 py-1 rounded text-xs hover:bg-red-700">Decline</button>
                                            </div>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default SupplyRequestsPage;
