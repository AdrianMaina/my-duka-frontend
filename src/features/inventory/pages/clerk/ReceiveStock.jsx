// =======================================================================
// FILE: src/pages/clerk/ReceiveStock.jsx
// =======================================================================
import React from 'react';
import Card from '../../components/ui/Card';

const ReceiveStock = () => {
    return (
        <Card title="Receive Stock from Supplier">
            <form className="max-w-lg mx-auto">
                <div className="mb-6">
                    <label htmlFor="sku" className="block mb-2 font-bold">Scan or Enter SKU</label>
                    <input type="text" id="sku" placeholder="e.g., 123456789" className="w-full p-3 border border-border-color rounded-md focus:ring-2 focus:ring-primary-blue outline-none" />
                </div>
                 <div className="mb-6">
                    <label htmlFor="quantity" className="block mb-2 font-bold">Quantity Received</label>
                    <input type="number" id="quantity" className="w-full p-3 border border-border-color rounded-md focus:ring-2 focus:ring-primary-blue outline-none" />
                </div>
                <button type="submit" className="w-full p-3 bg-primary-blue text-white rounded-md font-bold text-lg hover:bg-blue-700 transition-colors">Add to Inventory</button>
            </form>
        </Card>
    );
};

export default ReceiveStock;
