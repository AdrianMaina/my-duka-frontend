// =======================================================================
// FILE: src/pages/clerk/RecordSale.jsx (NEW)
// =======================================================================
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { recordSale } from '../../features/clerkSlice';
import { fetchInventory } from '../../features/inventory/inventorySlice';
import Card from '../../components/ui/Card';

const RecordSale = () => {
    const dispatch = useDispatch();
    const { status, error } = useSelector(state => state.clerk);
    const { items: inventoryItems } = useSelector(state => state.inventory);
    const { user } = useSelector(state => state.auth);

    const [formData, setFormData] = useState({
        inventory_item: '',
        quantity_sold: '',
        payment_method: 'cash',
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
        dispatch(recordSale(formData));
    };

    return (
        <Card title="Record a New Sale">
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
                                {item.name} (In Stock: {item.quantity})
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-bold">Quantity Sold</label>
                    <input type="number" name="quantity_sold" onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-bold">Payment Method</label>
                    <select name="payment_method" onChange={handleChange} className="w-full p-2 border rounded bg-white">
                        <option value="cash">Cash</option>
                        <option value="mpesa">M-Pesa</option>
                    </select>
                </div>
                <button type="submit" className="w-full p-3 bg-support-green text-white rounded-md font-bold" disabled={status === 'loading'}>
                    {status === 'loading' ? 'Recording...' : 'Complete Sale'}
                </button>
                {status === 'succeeded' && <p className="text-support-green mt-4">Sale recorded successfully!</p>}
                {status === 'failed' && <p className="text-alert-red mt-4">{error?.detail || "Failed to record sale."}</p>}
            </form>
        </Card>
    );
};

export default RecordSale;
