import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {

    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleInputChange = event => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async event => {
        event.preventDefault();
        const { confirmPassword, ...userData } = formData; // Exclude confirmPassword from userData
        if (formData.password !== confirmPassword) {
            // Display error message or handle password mismatch
            toast.error("Passwords do not match");
            return;
        }
        try {
            const { data } = await axios.post('/api/v1/user/register', userData); // Send userData to the server
            toast.success('Register Successfully')
            navigate('/login')
            // Handle successful registration
        } catch (error) {
            toast.error(error.response.data.massage)
            console.error('Error registering user:', error);
            // Handle registration failure
        }
    };


    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
                <h2 className="text-2xl mb-4">Sign Up</h2>
                <form className="w-full" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2">Email:</label>
                        <input type="email" name="email" className="w-full px-3 py-2 border rounded-lg" onChange={handleInputChange} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2">Password:</label>
                        <div className="relative">
                            <input type={showPassword ? 'text' : 'password'} name="password" className="w-full px-3 py-2 border rounded-lg" onChange={handleInputChange} />
                            <button
                                type="button"
                                className="absolute right-0 top-0 mr-2 mt-3"
                                onClick={togglePasswordVisibility}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                            </button>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block mb-2">Confirm Password:</label>
                        <div className="relative">
                            <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" className="w-full px-3 py-2 border rounded-lg" onChange={handleInputChange} />
                            <button
                                type="button"
                                className="absolute right-0 top-0 mr-2 mt-3"
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg">Sign Up</button>
                </form>
                <div className="mt-4">
                    <p>Already have an account? <a href="/login" className="text-blue-500">Login here</a></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
