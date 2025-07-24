// =======================================================================
// FILE: src/pages/merchant/ViewStores.jsx (EDITED)
// =======================================================================
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import { FaMapMarkerAlt, FaUsers } from 'react-icons/fa';
import { addStore, setActiveStore, fetchStores } from '../../features/stores/storesSlice';
import AddStoreModal from '../../components/stores/AddStoreModal';

const ViewStores = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { stores = [], status } = useSelector(state => state.stores) || {};
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchStores());
        }
    }, [status, dispatch]);

    const handleSelectStore = (store) => {
        dispatch(setActiveStore(store));
        navigate('/merchant/overview');
    };

    const handleAddStore = (storeData) => {
        dispatch(addStore(storeData));
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Your Stores</h2>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-primary-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    + Add New Store
                </button>
            </div>

            {status === 'loading' && <p>Loading stores...</p>}
            
            {status === 'succeeded' && stores.length === 0 && (
                <Card>
                    <div className="text-center text-gray-500">
                        <p className="font-semibold">No stores found.</p>
                        <p>Click "+ Add New Store" to get started.</p>
                    </div>
                </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {stores.map(store => (
                    <Card key={store.id} title={store.name} className="flex flex-col !mb-0">
                        <div className="flex-grow">
                            <div className="flex items-center text-gray-600 mb-4">
                                <FaMapMarkerAlt className="mr-2 text-primary-blue" />
                                <span>{store.location}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <FaUsers className="mr-2 text-primary-blue" />
                                <span>{store.staff_count} Staff Members</span>
                            </div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-border-color">
                            <button onClick={() => handleSelectStore(store)} className="w-full text-center font-semibold text-primary-blue hover:underline">
                                Select Store
                            </button>
                        </div>
                    </Card>
                ))}
            </div>
            <AddStoreModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAddStore={handleAddStore}
            />
        </div>
    );
};

export default ViewStores;
