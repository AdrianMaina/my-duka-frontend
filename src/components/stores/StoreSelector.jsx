// =======================================================================
// FILE: src/components/stores/StoreSelector.jsx (FIXED)
// =======================================================================
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveStore } from '../../features/stores/storesSlice';
import { FaStore } from 'react-icons/fa';

const StoreSelector = () => {
    const dispatch = useDispatch();
    // Provide a default empty object to prevent destructuring error on initial render
    const { stores = [], activeStore, status } = useSelector(state => state.stores) || {};

    const handleStoreChange = (e) => {
        const storeId = parseInt(e.target.value, 10);
        const selectedStore = stores.find(store => store.id === storeId);
        if (selectedStore) {
            dispatch(setActiveStore(selectedStore));
        }
    };

    if (status === 'loading' || !activeStore) {
        return <div className="text-sm">Loading stores...</div>;
    }

    if (stores.length === 0) {
        return <div className="text-sm">No stores found.</div>;
    }

    return (
        <div className="flex items-center bg-gray-100 rounded-lg p-2">
            <FaStore className="text-primary-blue mr-2" />
            <select
                value={activeStore.id}
                onChange={handleStoreChange}
                className="bg-transparent font-semibold focus:outline-none"
            >
                {stores.map(store => (
                    <option key={store.id} value={store.id}>
                        {store.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default StoreSelector;

