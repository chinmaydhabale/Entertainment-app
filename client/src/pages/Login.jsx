import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axiosInstance from '../utils/axiosInstance';

const Login = () => {

    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const validatepassword = async (event) => {
        event.preventDefault();
        try {
            const res = await axiosInstance.post('/api/v1/user/login', { email: email, password: password })
            console.log(res)
            const data = res.data
            if (data.success) {
                toast.success(data.massage)
                navigate('/')
            } else {
                toast.error("invalid email and password")
            }

        } catch (error) {
            toast.error(error.response.data.massage)
            console.log("user not found", error)
        }
    }

    // useEffect(()=>{
    //     validatepassword
    // },[])


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
                    <p>Don't have an account? <a href="/register" className="text-blue-500">Create your account</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
