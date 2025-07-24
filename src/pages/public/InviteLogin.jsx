// =======================================================================
// FILE: src/pages/public/InviteLogin.jsx (EDITED)
// =======================================================================
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { completeInvite } from '../../features/auth/authSlice';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';

const InviteLogin = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    
    const status = useSelector(state => state.auth.status);
    const error = useSelector(state => state.auth.error);
    const isLoading = status === 'loading';

    const handleSubmit = async (e) => {
        e.preventDefault();
        const resultAction = await dispatch(completeInvite({ token, password }));
        if (completeInvite.fulfilled.match(resultAction)) {
            alert("Account activated! Please log in with your new password.");
            navigate('/login');
        }
    };

    const getErrorMessage = (error) => {
        if (!error) return "An unknown error occurred.";
        if (error.error) return error.error;
        return "Failed to activate account. The link may be invalid or expired.";
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="w-full max-w-md">
                <div className="relative">
                    <div className="bg-white backdrop-blur-sm bg-opacity-95 rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                        <div className="px-8 pt-8 pb-6 text-center">
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">Activate Your Account</h1>
                            <p className="text-gray-600">Set a password to complete your registration.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="px-8 pb-8">
                            <div className="mb-6">
                                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                    New Password
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <FaLock size={16} />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        placeholder="Enter your new password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                                    </button>
                                </div>
                            </div>

                            {status === 'failed' && (
                                <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-red-600 text-sm text-center font-medium">
                                        {getErrorMessage(error)}
                                    </p>
                                </div>
                            )}

                            <button 
                                type="submit" 
                                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Activating...' : 'Set Password & Activate'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InviteLogin