// =======================================================================
// FILE: src/components/stores/AddStoreModal.jsx (NEW)
// =======================================================================
import React, { useState } from 'react';

const AddStoreModal = ({ isOpen, onClose, onAddStore }) => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !location) return;
        onAddStore({ name, location });
        setName('');
        setLocation('');
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-md">
                <h2 className="text-2xl font-bold text-primary-blue mb-6">Add a New Store</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="storeName" className="block mb-2 font-bold">Store Name</label>
                        <input
                            type="text"
                            id="storeName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 border border-border-color rounded-md focus:ring-2 focus:ring-primary-blue outline-none"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="storeLocation" className="block mb-2 font-bold">Location</label>
                        <input
                            type="text"
                            id="storeLocation"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full p-3 border border-border-color rounded-md focus:ring-2 focus:ring-primary-blue outline-none"
                            placeholder="e.g., Moi Avenue, Nairobi"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-4">
                        <button type="button" onClick={onClose} className="py-2 px-4 rounded-md text-gray-600 border border-gray-400 hover:bg-gray-100 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" className="py-2 px-4 rounded-md text-white bg-primary-blue hover:bg-blue-700 transition-colors">
                            Add Store
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStoreModal;

