import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axiosInstance from '../utils/axiosInstance';

const Login = () => {

    // React Router's navigate function for redirection
    const navigate = useNavigate()

    // State variables for email, password, and password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // Function to handle login validation
    const validatepassword = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        try {
            // Sending login request to the server
            const res = await axiosInstance.post('/api/v1/user/login', { email: email, password: password })
            const data = res.data
            if (data.success) {
                toast.success(data.massage) // Display success message
                navigate('/') // Redirect to home page
            } else {
                toast.error("Invalid email and password") // Display error message for invalid credentials
            }

        } catch (error) {
            toast.error(error.response.data.massage) // Display error message for server errors
            console.log("User not found", error)
        }
    }

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
                <h2 className="text-2xl mb-4">Login</h2>
                <form onSubmit={validatepassword} className="w-full">
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2">Email:</label>
                        <input type="email" id="email" onChange={(e) => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2">Password:</label>
                        <div className="relative">
                            <input type={showPassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)} id="password" className="w-full px-3 py-2 border rounded-lg" />
                            <button
                                type="button"
                                className="absolute right-0 top-0 mr-2 mt-3"
                                onClick={togglePasswordVisibility}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg">Login</button>
                </form>
                <div className="mt-4">
                    <p>Don't have an account? <Link href="/register" className="text-blue-500">Create your account</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
