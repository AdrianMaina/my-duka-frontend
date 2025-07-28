// =======================================================================
// FILE: src/pages/clerk/LogSpoilage.jsx (EDITED)
// =======================================================================
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logSpoilage } from '../../features/clerkSlice';
import { fetchInventory } from '../../features/inventory/inventorySlice';
import Card from '../../components/ui/Card';

const LogSpoilage = () => {
    const dispatch = useDispatch();
    const { status, error } = useSelector(state => state.clerk);
    const { items: inventoryItems } = useSelector(state => state.inventory);
    const { user } = useSelector(state => state.auth);
    
    const [formData, setFormData] = useState({
        inventory_item: '',
        quantity: '',
        reason: 'Expired',
    });

    useEffect(() => {
        if (user?.store) {
            dispatch(fetchInventory(user.store));
        }
    }, [dispatch, user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(logSpoilage(formData));
    };

    return (
        <Card title="Log Spoiled or Damaged Items">
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <div className="mb-4">
                    <label className="block mb-2 font-bold">Product</label>
                    <select 
                        name="inventory_item" 
                        onChange={handleChange} 
                        className="w-full p-2 border rounded bg-white"
                        required 
                    >
                        <option value="">Select a product</option>
                        {inventoryItems.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-bold">Quantity Spoiled</label>
                    <input type="number" name="quantity" onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-bold">Reason</label>
                    <select name="reason" onChange={handleChange} className="w-full p-2 border rounded bg-white">
                        <option value="Expired">Expired</option>
                        <option value="Damaged">Damaged</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                <button type="submit" className="w-full p-3 bg-alert-red text-white rounded-md font-bold" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Logging...' : 'Log Item'}
                </button>
                {status === 'succeeded' && <p className="text-support-green mt-4">Spoilage logged successfully!</p>}
                {status === 'failed' && <p className="text-alert-red mt-4">{error?.detail || "Submission failed."}</p>}
            </form>
        </Card>
    );
};

export default LogSpoilage;
