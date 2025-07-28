// FILE: src/components/layout/Header.jsx (EDITED)
// =======================================================================
import React from 'react';
import { FaBars } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import StoreSelector from '../stores/StoreSelector.jsx';

const Header = ({ toggleSidebar }) => {
    const { user } = useSelector(state => state.auth);

    return (
        <header className="flex items-center justify-between p-4 bg-white shadow-md sticky top-0 z-10">
            <div className="flex items-center">
                <button onClick={toggleSidebar} className="text-2xl mr-4 lg:hidden">
                    <FaBars />
                </button>
                <h1 className="text-xl font-semibold hidden sm:block">
                    Welcome, {user?.username || 'User'}!
                </h1>
            </div>
            {user?.role === 'merchant' && <StoreSelector />}
        </header>
    );
};

export default Header;
