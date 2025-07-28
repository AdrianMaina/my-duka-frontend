// =======================================================================
// FILE: src/pages/admin/InviteClerk.jsx (FIXED)
// =======================================================================
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { inviteUser, resetInviteStatus } from '../../features/users/usersSlice';
import { fetchStaffList } from '../../features/dashboardSlice';
import Card from '../../components/ui/Card';

const InviteClerk = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const { inviteStatus, error } = useSelector(state => state.users) || {};
    const { user } = useSelector(state => state.auth); // Get the logged-in user

    useEffect(() => {
        return () => { dispatch(resetInviteStatus()); }
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(inviteUser({ email, role: 'clerk' }));
        // An admin's store is part of their user object
        if (inviteUser.fulfilled.match(resultAction) && user && user.store) {
            dispatch(fetchStaffList(user.store));
        }
    };

    const getErrorMessage = (error) => {
        if (!error) return "Failed to send invite.";
        if (error.error) return error.error;
        return "An unknown error occurred.";
    };

    return (
        <Card title="Invite a Clerk">
            <p className="mb-6 text-gray-600">Invite a new clerk to your store. They will only have access to day-to-day operations.</p>
            
            {inviteStatus === 'succeeded' ? (
                <div className="text-center p-4 bg-support-green/20 text-support-green font-bold rounded-md">
                    <p>Invite sent successfully!</p>
                    <button onClick={() => { setEmail(''); dispatch(resetInviteStatus()); }} className="mt-2 text-sm underline">Send another invite</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="max-w-lg">
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 font-bold">Clerk's Email</label>
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

export default InviteClerk;
