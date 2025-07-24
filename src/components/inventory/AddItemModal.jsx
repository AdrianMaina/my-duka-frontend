// =======================================================================
// FILE: src/components/inventory/AddItemModal.jsx (NEW)
// =======================================================================
import React, { useState, useEffect } from 'react';

const AddItemModal = ({ item, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        buying_price: '',
        selling_price: '',
    });

    useEffect(() => {
        if (item) {
            setFormData(item);
        }
    }, [item]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
                <h2 className="text-2xl font-bold text-primary-blue mb-6">{item ? 'Edit' : 'Add'} Inventory Item</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4"><label>Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded" required /></div>
                    <div className="mb-4"><label>Quantity</label><input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="w-full p-2 border rounded" required /></div>
                    <div className="mb-4"><label>Buying Price</label><input type="number" step="0.01" name="buying_price" value={formData.buying_price} onChange={handleChange} className="w-full p-2 border rounded" required /></div>
                    <div className="mb-4"><label>Selling Price</label><input type="number" step="0.01" name="selling_price" value={formData.selling_price} onChange={handleChange} className="w-full p-2 border rounded" required /></div>
                    <div className="flex justify-end gap-4 mt-6">
                        <button type="button" onClick={onClose} className="py-2 px-4 rounded-md text-gray-600 border">Cancel</button>
                        <button type="submit" className="py-2 px-4 rounded-md text-white bg-primary-blue">Save Item</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddItemModal;
