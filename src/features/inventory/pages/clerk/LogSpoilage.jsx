// FILE: src/pages/clerk/LogSpoilage.jsx
// =======================================================================
import React from 'react';
import Card from '../../components/ui/Card';

const LogSpoilage = () => {
    return (
        <Card title="Log Spoiled or Damaged Items">
            <form className="max-w-lg mx-auto">
                <div className="mb-6">
                    <label htmlFor="sku" className="block mb-2 font-bold">Scan or Enter SKU</label>
                    <input type="text" id="sku" placeholder="e.g., 123456789" className="w-full p-3 border border-border-color rounded-md focus:ring-2 focus:ring-primary-blue outline-none" />
                </div>
                 <div className="mb-6">
                    <label htmlFor="quantity" className="block mb-2 font-bold">Quantity Spoiled</label>
                    <input type="number" id="quantity" className="w-full p-3 border border-border-color rounded-md focus:ring-2 focus:ring-primary-blue outline-none" />
                </div>
                <div className="mb-6">
                    <label htmlFor="reason" className="block mb-2 font-bold">Reason</label>
                    <select id="reason" className="w-full p-3 border border-border-color rounded-md focus:ring-2 focus:ring-primary-blue outline-none bg-white">
                        <option>Expired</option>
                        <option>Damaged</option>
                        <option>Other</option>
                    </select>
                </div>
                <button type="submit" className="w-full p-3 bg-alert-red text-white rounded-md font-bold text-lg hover:bg-red-700 transition-colors">Log Item</button>
            </form>
        </Card>
    );
};

export default LogSpoilage;