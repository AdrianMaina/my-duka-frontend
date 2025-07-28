// =======================================================================
// FILE: src/pages/merchant/MpesaTransactions.jsx (FIXED)
// =======================================================================
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMpesaTransactions } from '../../features/PaymentSlice';
import Card from '../../components/ui/Card';
import NoStorePlaceholder from '../../components/ui/NoStorePlaceholder';

const MpesaTransactions = () => {
    const dispatch = useDispatch();
    const { transactions, status } = useSelector(state => state.payments) || {};
    const { activeStore } = useSelector(state => state.stores) || {};

    useEffect(() => {
        if (activeStore) {
            dispatch(fetchMpesaTransactions(activeStore.id));
        }
    }, [dispatch, activeStore]);
    
    const getStatusTag = (status) => {
        const baseClasses = "py-1 px-3 rounded-full text-white text-xs font-bold capitalize";
        if (status === 'success') return `${baseClasses} bg-support-green`;
        if (status === 'failed') return `${baseClasses} bg-alert-red`;
        return `${baseClasses} bg-yellow-500`;
    }

    if (!activeStore) {
        return <NoStorePlaceholder pageTitle="M-Pesa Transactions" />;
    }

    return (
        <Card title={`M-Pesa Transaction History for ${activeStore?.name || ''}`}>
            {status === 'loading' && <p>Loading transactions...</p>}
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-soft-gray">
                            <th className="p-3 font-semibold">Date</th>
                            <th className="p-3 font-semibold">Recipient</th>
                            <th className="p-3 font-semibold">Amount (KES)</th>
                            <th className="p-3 font-semibold">Status</th>
                            <th className="p-3 font-semibold">Transaction ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions && transactions.map(tx => (
                            <tr key={tx.id} className="border-b border-border-color hover:bg-soft-gray">
                                <td className="p-3">{new Date(tx.created_at).toLocaleString()}</td>
                                <td className="p-3">{tx.supplier_name}</td>
                                <td className="p-3">{tx.amount}</td>
                                <td className="p-3"><span className={getStatusTag(tx.status)}>{tx.status}</span></td>
                                <td className="p-3">{tx.transaction_id || 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};

export default MpesaTransactions;
