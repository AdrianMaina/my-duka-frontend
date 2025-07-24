// =======================================================================
// FILE: src/pages/public/Register.jsx (FIXED)
// =======================================================================
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../features/auth/authSlice';
import { FaArrowLeft, FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaStore } from 'react-icons/fa';

const Register = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector(state => state.auth.user);
    const status = useSelector(state => state.auth.status);
    const error = useSelector(state => state.auth.error);
    const isLoading = status === 'loading';

    // This hook now safely handles the redirect after registration.
    useEffect(() => {
        if (user) {
            navigate(`/${user.role}/overview`);
        }
    }, [user, navigate]);

    const checkPasswordStrength = (password) => {
        let score = 0;
        let feedback = '';
        
        if (password.length >= 8) score += 1;
        if (/[a-z]/.test(password)) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/\d/.test(password)) score += 1;
        if (/[^a-zA-Z\d]/.test(password)) score += 1;

        switch (score) {
            case 0:
            case 1:
                feedback = 'Very Weak'; break;
            case 2:
                feedback = 'Weak'; break;
            case 3:
                feedback = 'Fair'; break;
            case 4:
                feedback = 'Good'; break;
            case 5:
                feedback = 'Strong'; break;
            default:
                feedback = '';
        }

        return { score, feedback };
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        if (name === 'password') {
            setPasswordStrength(checkPasswordStrength(value));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerUser(formData));
    };

    const getPasswordStrengthColor = (score) => {
        switch (score) {
            case 0:
            case 1:
                return 'bg-red-500';
            case 2:
                return 'bg-orange-500';
            case 3:
                return 'bg-yellow-500';
            case 4:
                return 'bg-blue-500';
            case 5:
                return 'bg-green-500';
            default:
                return 'bg-gray-300';
        }
    };
    
    const getErrorMessage = (error) => {
        if (!error) return "An unknown error occurred.";
        if (error.detail) return error.detail;
        const messages = Object.entries(error).map(([field, errors]) => `${field}: ${errors.join(' ')}`);
        if (messages.length > 0) {
            return messages.join(' ');
        }
        return "Registration failed. Please check your details and try again.";
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <div className="w-full max-w-md">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-blue-200 opacity-20 animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-indigo-200 opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>

                <div className="relative">
                    <Link 
                        to="/" 
                        className="inline-flex items-center justify-center w-10 h-10 mb-6 text-gray-600 hover:text-blue-600 hover:bg-white rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
                    >
                        <FaArrowLeft size={16} />
                    </Link>

                    <div className="bg-white backdrop-blur-sm bg-opacity-95 rounded-2xl shadow-xl border border-white/20 overflow-hidden">
                        <div className="px-8 pt-8 pb-6 text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                                <FaStore className="text-white text-xl" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-800 mb-2">Join MyDuka</h1>
                            <p className="text-gray-600">Create your merchant account</p>
                        </div>

                        <form onSubmit={handleSubmit} className="px-8 pb-8">
                            <div className="mb-6">
                                <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Username
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <FaUser size={16} />
                                    </div>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 bg-gray-50 focus:bg-white hover:bg-white"
                                        placeholder="Enter your username"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <FaEnvelope size={16} />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 bg-gray-50 focus:bg-white hover:bg-white"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                        <FaLock size={16} />
                                    </div>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        id="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 bg-gray-50 focus:bg-white hover:bg-white"
                                        placeholder="Create a strong password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                    >
                                        {showPassword ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                                    </button>
                                </div>
                                {formData.password && (
                                    <div className="mt-2">
                                        <div className="flex space-x-1 mb-1">
                                            {[1, 2, 3, 4, 5].map((level) => (
                                                <div
                                                    key={level}
                                                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                                                        passwordStrength.score >= level 
                                                            ? getPasswordStrengthColor(passwordStrength.score)
                                                            : 'bg-gray-200'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        <p className={`text-xs font-medium ${
                                            passwordStrength.score <= 2 ? 'text-red-600' : 'text-gray-500'
                                        }`}>
                                            {passwordStrength.feedback}
                                        </p>
                                    </div>
                                )}
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
                                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Creating Account...</span>
                                    </div>
                                ) : (
                                    'Create Account'
                                )}
                            </button>
                        </form>

                        <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
                            <p className="text-center text-gray-600">
                                Already have an account?{' '}
                                <Link 
                                    to="/login" 
                                    className="font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200 hover:underline"
                                >
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
