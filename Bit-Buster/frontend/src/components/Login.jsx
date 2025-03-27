import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = { email, password };

        axios.post('http://localhost:3000/user/login', payload)
            .then((res) => {
                setLoading(false);
                toast.success("Login Successful");
                console.log("Login done", res);
                localStorage.setItem('token', JSON.stringify(res.data.token));
                navigate("/");
            })
            .catch((err) => {
                toast.error("Invalid Credentials");
                console.error("Error while login", err);
                setLoading(false);
            });
    };

    return (
        <><Navbar />
        <div className="flex min-h-screen">
            {/* Left Side - Dark Background */}
            <div className="w-1/3  flex items-center justify-center bg-indigo-900">
            <motion.div
                initial={{ x: -200, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1 }}
                className="w-1/3 bg-indigo-900 flex items-center justify-center p-10"
            >
                <motion.h1
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.5 }}
                    className="text-white text-6xl font-bold text-center"
                >
                    Welcome Back! <br /> Login to Continue 🚀
                </motion.h1>
            </motion.div>
            </div>

            {/* Right Side - Form */}
            <div className="w-2/3  flex items-center justify-center bg-gray-100 ">
                <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" placeholder="hello" className="block text-sm font-medium text-gray-700">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                placeholder='Enter your email address'
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full py-2 px-4 bg-indigo-900 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <p className="mt-4 text-center text-sm">
                        Don't have an account? <a href="/register" className="text-indigo-600 font-semibold">Register</a>
                    </p>

                    {/* Social Media Icons */}
                    <div className="mt-4 flex justify-center space-x-4">
                        <a href="#" className="text-gray-600 text-xl"><i className="fab fa-facebook"></i></a>
                        <a href="#" className="text-gray-600 text-xl"><i className="fab fa-whatsapp"></i></a>
                        <a href="#" className="text-gray-600 text-xl"><i className="fab fa-telegram"></i></a>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default Login;
