// =======================================================================
// FILE: src/pages/merchant/MerchantOverview.jsx (EDITED)
// =======================================================================
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../../components/ui/Card';
import { fetchStaffList } from '../../features/dashboardSlice';
import { deleteStaff, manageStaff } from '../../features/users/usersSlice';
import NoStorePlaceholder from '../../components/ui/NoStorePlaceholder';
import { FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';

const StatusBadge = ({ status, expiry }) => {
    const isExpired = expiry && new Date(expiry) < new Date();
    
    if (isExpired) {
        status = 'declined';
    }

    const baseClasses = "py-1 px-3 rounded-full text-white text-xs font-bold capitalize";
    if (status === 'verified') return <span className={`${baseClasses} bg-support-green`}>Verified</span>;
    if (status === 'pending') return <span className={`${baseClasses} bg-yellow-500`}>Pending</span>;
    if (status === 'declined') return <span className={`${baseClasses} bg-alert-red`}>Declined</span>;
    return null;
};

const MerchantOverview = () => {
    const dispatch = useDispatch();
    const { activeStore } = useSelector(state => state.stores) || {};
    const { staff, status } = useSelector(state => state.dashboard) || {};

    useEffect(() => {
        if (activeStore) {
            dispatch(fetchStaffList(activeStore.id));
        }
    }, [activeStore, dispatch]);

    const handleToggleActive = (userId, isActive) => {
        dispatch(manageStaff({ userId, isActive })).then(() => {
            if (activeStore) {
                dispatch(fetchStaffList(activeStore.id));
            }
        });
    };

    const handleDelete = (userId) => {
        if (window.confirm("Are you sure you want to permanently delete this user?")) {
            dispatch(deleteStaff(userId)).then(() => {
                if (activeStore) {
                    dispatch(fetchStaffList(activeStore.id));
                }
            });
        }
    };

    if (!activeStore) {
        return <NoStorePlaceholder pageTitle="Staff Management" />;
    }

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Staff Management for: <span className="text-primary-blue">{activeStore.name}</span></h2>
            
            {status === 'loading' && <p>Loading staff...</p>}

            {status === 'succeeded' && (
                <Card title="Staff Members">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-soft-gray">
                                    <th className="p-3 font-semibold">Name</th>
                                    <th className="p-3 font-semibold">Email</th>
                                    <th className="p-3 font-semibold">Role</th>
                                    <th className="p-3 font-semibold">Status</th>
                                    <th className="p-3 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {staff.map(member => (
                                    <tr key={member.id} className="border-b border-border-color">
                                        <td className="p-3">{member.name || '-'}</td>
                                        <td className="p-3">{member.email}</td>
                                        <td className="p-3 capitalize">{member.role}</td>
                                        <td className="p-3">
                                            <StatusBadge status={member.status} expiry={member.invite_expiry} />
                                        </td>
                                        <td className="p-3 flex items-center gap-4">
                                            <button 
                                                onClick={() => handleToggleActive(member.id, !member.is_active)}
                                                className={member.is_active ? "text-support-green" : "text-gray-400"}
                                                title={member.is_active ? "Deactivate User" : "Activate User"}
                                            >
                                                {member.is_active ? <FaToggleOn size={24}/> : <FaToggleOff size={24}/>}
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(member.id)}
                                                className="text-alert-red hover:opacity-75"
                                                title="Delete User"
                                            >
                                                <FaTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}
        </div>
    );
};

export default MerchantOverview;
