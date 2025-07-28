// =======================================================================
// FILE: src/components/layout/Sidebar.jsx (EDITED)
// =======================================================================
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice.js';
import { FaTachometerAlt, FaStore, FaUsers, FaChartBar, FaCreditCard, FaSignOutAlt, FaBoxOpen, FaTruckLoading, FaExclamationTriangle, FaPaperPlane, FaTimes, FaCashRegister } from 'react-icons/fa';

const merchantLinks = [
    { icon: <FaTachometerAlt />, text: 'Overview', to: '/merchant/overview' },
    { icon: <FaStore />, text: 'Manage Stores', to: '/merchant/stores' },
    { icon: <FaUsers />, text: 'Invite Admin', to: '/merchant/invite-admin' },
    { icon: <FaChartBar />, text: 'Reports', to: '/merchant/reports' },
    { icon: <FaCreditCard />, text: 'M-Pesa Log', to: '/merchant/mpesa-transactions' },
    { icon: <FaPaperPlane />, text: 'Pay Suppliers', to: '/merchant/pay-supplier' },
];

const adminLinks = [
    { icon: <FaTachometerAlt />, text: 'Overview', to: '/admin/overview' },
    { icon: <FaBoxOpen />, text: 'Inventory', to: '/admin/inventory' },
    { icon: <FaTruckLoading />, text: 'Supply Requests', to: '/admin/supply-requests' },
    { icon: <FaUsers />, text: 'Invite Clerk', to: '/admin/invite-clerk' },
];

const clerkLinks = [
    { icon: <FaTachometerAlt />, text: 'Overview', to: '/clerk/overview' },
    { icon: <FaCashRegister />, text: 'Record Sale', to: '/clerk/record-sale' },
    { icon: <FaTruckLoading />, text: 'Receive Stock', to: '/clerk/receive-stock' },
    { icon: <FaExclamationTriangle />, text: 'Log Spoilage', to: '/clerk/log-spoilage' },
    { icon: <FaPaperPlane />, text: 'Request Stock', to: '/clerk/request-stock' },
];

const Sidebar = ({ isOpen, toggle }) => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    let links = [];
    if (user?.role === 'merchant') links = merchantLinks;
    if (user?.role === 'admin') links = adminLinks;
    if (user?.role === 'clerk') links = clerkLinks;
    
    const baseLinkClasses = "flex items-center p-4 text-text-dark hover:bg-soft-gray transition-colors duration-200 rounded-lg";
    const activeLinkClasses = "bg-primary-blue text-white font-bold";

    return (
        <>
            <aside className={`bg-white w-64 h-screen flex flex-col fixed top-0 lg:sticky lg:translate-x-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-30 shadow-lg lg:shadow-none`}>
                <div className="flex items-center justify-between p-4 border-b border-border-color">
                    <h3 className="text-2xl font-bold text-primary-blue">MyDuka</h3>
                    <button onClick={toggle} className="lg:hidden text-2xl">
                        <FaTimes />
                    </button>
                </div>
                <nav className="flex-grow p-4 space-y-2">
                    <ul>
                        {links.map((link, index) => (
                            <li key={index}>
                                <NavLink 
                                    to={link.to} 
                                    className={({ isActive }) => `${baseLinkClasses} ${isActive ? activeLinkClasses : ''}`}
                                    onClick={toggle}
                                >
                                    <span className="mr-4 text-xl">{link.icon}</span>
                                    <span>{link.text}</span>
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="p-4 border-t border-border-color">
                    <button onClick={handleLogout} className={`${baseLinkClasses} w-full hover:text-alert-red`}>
                        <span className="mr-4 text-xl"><FaSignOutAlt /></span>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
            {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden" onClick={toggle}></div>}
        </>
    );
};

export default Sidebar;
