import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axiosInstance from '../utils/axiosInstance'; // Import axiosInstance from your utils folder

const Register = () => {

    const navigate = useNavigate()

    // State variables for password visibility and form data
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    // Function to toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Function to toggle confirm password visibility
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    // Function to handle input changes in the form
    const handleInputChange = event => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Function to handle form submission
    const handleSubmit = async event => {
        event.preventDefault();
        const { confirmPassword, ...userData } = formData; // Exclude confirmPassword from userData
        if (formData.password !== confirmPassword) {
            // Display error message if passwords do not match
            toast.error("Passwords do not match");
            return;
        }
        try {
            const { data } = await axiosInstance.post('/api/v1/user/register', userData); // Send userData to the server using axiosInstance
            toast.success('Register Successfully') // Display success message
            navigate('/login') // Redirect to login page after successful registration
        } catch (error) {
            toast.error(error.response.data.massage) // Display error message for registration failure
            console.error('Error registering user:', error);
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
