// =======================================================================
// FILE: src/pages/admin/AdminInventory.jsx (FIXED)
// =======================================================================
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInventory, addInventoryItem, updateInventoryItem, deleteInventoryItem } from '../../features/inventory/inventorySlice';
import Card from '../../components/ui/Card';
import AddItemModal from '../../components/inventory/AddItemModal';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AdminInventory = () => {
    const dispatch = useDispatch();
    const { items = [], status } = useSelector(state => state.inventory) || {};
    const { user } = useSelector(state => state.auth);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    const adminStoreId = user?.store;

    useEffect(() => {
        if (adminStoreId) {
            dispatch(fetchInventory(adminStoreId));
        }
    }, [dispatch, adminStoreId]);

    const handleOpenModal = (item = null) => {
        setCurrentItem(item);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setCurrentItem(null);
        setIsModalOpen(false);
    };

    const handleSaveItem = (itemData) => {
        if (currentItem) {
            dispatch(updateInventoryItem({ ...itemData, id: currentItem.id }));
        } else {
            dispatch(addInventoryItem({ ...itemData, store: adminStoreId }));
        }
        handleCloseModal();
    };
    
    const handleDelete = (itemId) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            dispatch(deleteInventoryItem(itemId));
        }
    };

    if (!adminStoreId) {
        return <Card title="Inventory Management"><p>You are not assigned to a store.</p></Card>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold">Inventory Management</h2>
                <button 
                    onClick={() => handleOpenModal()}
                    className="bg-primary-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
                >
                    + Add New Item
                </button>
            </div>
            <Card>
                {status === 'loading' && <p>Loading inventory...</p>}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-soft-gray">
                                <th className="p-3">Name</th>
                                <th className="p-3">Quantity</th>
                                <th className="p-3">Buying Price</th>
                                <th className="p-3">Selling Price</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map(item => (
                                <tr key={item.id} className="border-b">
                                    <td className="p-3">{item.name}</td>
                                    <td className="p-3">{item.quantity}</td>
                                    <td className="p-3">{item.buying_price}</td>
                                    <td className="p-3">{item.selling_price}</td>
                                    <td className="p-3 flex gap-4">
                                        <button onClick={() => handleOpenModal(item)} className="text-primary-blue"><FaEdit /></button>
                                        <button onClick={() => handleDelete(item.id)} className="text-alert-red"><FaTrash /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
            {isModalOpen && (
                <AddItemModal
                    item={currentItem}
                    onClose={handleCloseModal}
                    onSave={handleSaveItem}
                />
            )}
        </div>
    );
};

export default AdminInventory;
