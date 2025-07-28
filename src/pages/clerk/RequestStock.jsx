// =======================================================================
// FILE: src/pages/clerk/RequestStock.jsx (FIXED)
// =======================================================================
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestStock } from '../../features/clerkSlice';
import { fetchInventory } from '../../features/inventory/inventorySlice';
import Card from '../../components/ui/Card';

const RequestStock = () => {
    const dispatch = useDispatch();
    const { status, error } = useSelector(state => state.clerk);
    const { items: inventoryItems } = useSelector(state => state.inventory);
    const { user } = useSelector(state => state.auth);

    const [formData, setFormData] = useState({
        product_name: '', // This now matches the backend serializer
        quantity_requested: '',
        notes: '',
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
        dispatch(requestStock(formData));
    };

    return (
        <Card title="Request New Stock">
            <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                <div className="mb-4">
                    <label className="block mb-2 font-bold">Product</label>
                    <select 
                        name="product_name" // This now matches the backend serializer
                        value={formData.product_name}
                        onChange={handleChange} 
                        className="w-full p-2 border rounded bg-white"
                        required 
                    >
                        <option value="">Select a product</option>
                        {inventoryItems.map(item => (
                            <option key={item.id} value={item.name}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-bold">Quantity Requested</label>
                    <input 
                        type="number" 
                        name="quantity_requested" 
                        value={formData.quantity_requested}
                        onChange={handleChange} 
                        className="w-full p-2 border rounded" 
                        required 
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-bold">Notes (Optional)</label>
                    <textarea 
                        name="notes" 
                        value={formData.notes}
                        onChange={handleChange} 
                        className="w-full p-2 border rounded" 
                    />
                </div>
                <button type="submit" className="w-full p-3 bg-primary-blue text-white rounded-md font-bold" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Submitting...' : 'Send Request'}
                </button>
                {status === 'succeeded' && <p className="text-support-green mt-4">Request sent successfully!</p>}
                {status === 'failed' && <p className="text-alert-red mt-4">{error?.detail || "Request failed."}</p>}
            </form>
        </Card>
    );
};

export default RequestStock;
