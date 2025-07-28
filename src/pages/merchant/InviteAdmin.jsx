// =======================================================================
// FILE: src/pages/merchant/InviteAdmin.jsx (Latest Version)
// =======================================================================
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { inviteUser, resetInviteStatus } from '../../features/users/usersSlice';
import { fetchStaffList } from '../../features/dashboardSlice';
import Card from '../../components/ui/Card';
import NoStorePlaceholder from '../../components/ui/NoStorePlaceholder';

const InviteAdmin = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const { inviteStatus, error } = useSelector(state => state.users) || {};
    const { activeStore } = useSelector(state => state.stores) || {};

    useEffect(() => {
        // Reset the invite status when the component is left
        return () => { dispatch(resetInviteStatus()); }
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!activeStore) {
            alert("Please select a store from the header dropdown before inviting an admin.");
            return;
        }
        // Dispatch the invite action and pass the necessary data
        const resultAction = await dispatch(inviteUser({ email, role: 'admin', store_id: activeStore.id }));
        
        // If the invite was sent successfully, refresh the staff list for the active store
        if (inviteUser.fulfilled.match(resultAction)) {
            dispatch(fetchStaffList(activeStore.id));
        }
    };

    const getErrorMessage = (error) => {
        if (!error) return "Failed to send invite.";
        if (error.error) return error.error; // For backend validation errors
        const messages = Object.values(error).flat();
        return messages.join(' ');
    };

    // If no store is selected, show the placeholder
    if (!activeStore) {
        return <NoStorePlaceholder pageTitle="Invite Admin" />;
    }

    return (
        <Card title="Invite an Admin">
            <p className="mb-6 text-gray-600">Enter the email of the person you want to invite as an admin for <span className="font-bold">{activeStore.name}</span>.</p>
            
            {inviteStatus === 'succeeded' ? (
                <div className="text-center p-4 bg-support-green/20 text-support-green font-bold rounded-md">
                    <p>Invite sent successfully!</p>
                    <button onClick={() => { setEmail(''); dispatch(resetInviteStatus()); }} className="mt-2 text-sm underline">Send another invite</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="max-w-lg">
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 font-bold">Admin's Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border rounded-md"
                            required
                        />
                    </div>
                    {inviteStatus === 'failed' && <p className="text-alert-red text-center mb-4">{getErrorMessage(error)}</p>}
                    <button type="submit" className="w-full p-3 bg-primary-blue text-white rounded-md font-bold text-lg" disabled={inviteStatus === 'loading'}>
                        {inviteStatus === 'loading' ? 'Sending...' : 'Send Invitation'}
                    </button>
                </form>
            )}
        </Card>
    );
};

export default InviteAdmin;
