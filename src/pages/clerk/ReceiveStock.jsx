// =======================================================================
// FILE: src/pages/clerk/ReceiveStock.jsx (EDITED)
// =======================================================================
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchApprovedRequests, confirmDelivery } from '../../features/clerkSlice';
import Card from '../../components/ui/Card';

const ReceiveStock = () => {
    const dispatch = useDispatch();
    const { approvedRequests, status } = useSelector(state => state.clerk) || {};
    const [phoneNumbers, setPhoneNumbers] = useState({});

    useEffect(() => {
        dispatch(fetchApprovedRequests());
    }, [dispatch]);

    const handlePhoneChange = (id, phone) => {
        setPhoneNumbers(prev => ({ ...prev, [id]: phone }));
    };

    const handleConfirm = (id) => {
        const phone = phoneNumbers[id];
        if (!phone) {
            alert("Please enter the supplier's phone number.");
            return;
        }
        dispatch(confirmDelivery({ id, phone }));
    };

    return (
        <Card title="Confirm Received Deliveries">
            {status === 'loading' && <p>Loading approved requests...</p>}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-soft-gray">
                            <th className="p-3">Product</th>
                            <th className="p-3">Quantity</th>
                            <th className="p-3">Supplier Phone</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {approvedRequests && approvedRequests.map(req => (
                            <tr key={req.id} className="border-b">
                                <td className="p-3">{req.product_name}</td>
                                <td className="p-3">{req.quantity_requested}</td>
                                <td className="p-3">
                                    <input 
                                        type="text"
                                        placeholder="Enter supplier phone"
                                        className="p-2 border rounded w-full"
                                        onChange={(e) => handlePhoneChange(req.id, e.target.value)}
                                    />
                                </td>
                                <td className="p-3">
                                    <button 
                                        onClick={() => handleConfirm(req.id)}
                                        className="bg-primary-blue text-white px-3 py-1 rounded"
                                    >
                                        Confirm Received
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default ReceiveStock;
