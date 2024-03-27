import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiFillAppstore } from "react-icons/ai";
import { HiBookmark } from "react-icons/hi2";
import { MdLocalMovies, MdMovie } from "react-icons/md";
import { TbDeviceTvOld } from "react-icons/tb";
import toast from 'react-hot-toast';
import axiosInstance from '../utils/axiosInstance';

const Navbar = () => {
    // Get the current path location
    const { pathname } = useLocation();
    const navigate = useNavigate()


    // Function to log out the user
    const handlelogOut = async () => {
        const { data } = await axiosInstance.get("/api/v1/user/logout")
        if (data.success) {
            window.location.reload();
            navigate('/')
            toast.success(data.message)
        } else {
            navigate('/login')
        }
    };

    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
            <MdMovie className="text-red-500 text-4xl md:text-3xl" />
            <div className="text-2xl  flex px-4 space-x-16 md:space-x-8 sm:space-x-4">
                <Link to='/'><AiFillAppstore className={
                    "hover:text-white " +
                    (pathname === "/"
                        ? "text-red-600"
                        : "text-white")
                } /></Link>
                <Link to='/movies'><MdLocalMovies
                    className={
                        "hover:text-white " +
                        (pathname === "/movies"
                            ? "text-red-600"
                            : "text-white")
                    }
                /></Link>
                <Link to='/tvseries'> <TbDeviceTvOld className={
                    "hover:text-white " +
                    (pathname === "/tvseries"
                        ? "text-red-600"
                        : "text-white")
                } /> </Link>
                <Link to='/bookmark'><HiBookmark className={
                    "hover:text-white " +
                    (pathname === "/bookmark"
                        ? "text-red-600"
                        : "text-white")
                } /></Link>
            </div>
            <button type="button" onClick={handlelogOut} className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">Open user menu</span>
                <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            </button>
        </nav>
    );
};

export default Navbar;
