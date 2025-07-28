=======================================================================
// FILE: src/pages/merchant/PaySupplier.jsx (NEW - FULL CODE)
// =======================================================================
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/ui/Card';
import { fetchUnpaidDeliveries, payWithMpesa } from '../../features/PaymentSlice';
import NoStorePlaceholder from '../../components/ui/NoStorePlaceholder';

const PaySupplier = () => {
    const dispatch = useDispatch();
    const { unpaidDeliveries, status } = useSelector(state => state.payments) || {};
    const { activeStore } = useSelector(state => state.stores) || {};

useEffect(() => {
    if (activeStore) {
        dispatch(fetchUnpaidDeliveries(activeStore.id));
    }
}, [dispatch, activeStore]);

const handlePay = (delivery) => {
    dispatch(payWithMpesa({
        stock_receive_id: delivery.id,
        amount: delivery.amount,
        phone_number: delivery.supplier_phone
    }));
};

if (!activeStore) {
    return <NoStorePlaceholder pageTitle="Pay Suppliers" />;
}

return (
    <Card title={`Unpaid Deliveries for ${activeStore.name}`}>
        {status === 'loading' && <p>Loading unpaid deliveries...</p>}
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="bg-soft-gray">
                        <th className="p-3 font-semibold">Supplier</th>
                        <th className="p-3 font-semibold">Product</th>
                        <th className="p-3 font-semibold">Quantity</th>
                        <th className="p-3 font-semibold">Amount (KES)</th>
                        <th className="p-3 font-semibold">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {unpaidDeliveries && unpaidDeliveries.map(delivery => (
                        <tr key={delivery.id} className="border-b">
                            <td className="p-3">{delivery.supplier_name}</td>
                            <td className="p-3">{delivery.product_name}</td>
                            <td className="p-3">{delivery.quantity}</td>
                            <td className="p-3">{delivery.amount}</td>
                            <td className="p-3">
                                <button 
                                    onClick={() => handlePay(delivery)}
                                    className="bg-primary-blue text-white px-3 py-1 rounded"
                                >
                                    Pay with M-Pesa
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </Card>
);
};

export default PaySupplier;
