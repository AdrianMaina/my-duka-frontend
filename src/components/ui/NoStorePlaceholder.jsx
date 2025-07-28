// =======================================================================
// FILE: src/components/ui/NoStorePlaceholder.jsx (NEW)
// =======================================================================
import React from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';

const NoStorePlaceholder = ({ pageTitle }) => {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">{pageTitle}</h2>
            <Card>
                <div className="text-center py-8 flex flex-col items-center">
                    <img 
                        src="/First store.png" 
                        alt="Cartoon shop owner" 
                        className="w-32 h-32 rounded-full mb-6"
                    />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Welcome to Your Dashboard!</h3>
                    <p className="text-gray-500 mb-6 max-w-md">
                        You haven't created any stores yet. Add your first store to manage your staff, reports, and inventory.
                    </p>
                    <Link 
                        to="/merchant/stores"
                        className="bg-primary-blue text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                    >
                        Create Your First Store
                    </Link>
                </div>
            </Card>
        </div>
    );
};

export default NoStorePlaceholder;