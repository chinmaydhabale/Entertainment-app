import React, { useEffect, useState } from 'react';
import Trending from '../../component/TrendingMovies/Trending';
import Recomandmovies from '../../component/Recommand/Movies/Recomandmovies';
import Recomandseries from '../../component/Recommand/Tvseries/Recomandseries';
import Navbar from '../../component/Navbar';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setsearchinput } from '../../redux/slice/searchSlice';
import Preloader from '../../component/Preloader';
import axiosInstance from '../../utils/axiosInstance';

const Homepage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [isloader, setIsLoader] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            const response = await axiosInstance.get(`/api/v1/data/all/search/${encodeURIComponent(query)}`);
            if (response.data.success) {
                dispatch(setsearchinput(response.data.searchData)); // Dispatching action to set search input data
                navigate('/search/multi'); // Navigating to search page
            } else {
                // Handle no results found
                console.log(response.data.message);
            }
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setIsLoader(true); // Setting loader to true after 3 seconds
        }, 3000);
    }, []); // Adding an empty dependency array to ensure the effect runs only once

    return (
        <div>
            <Navbar />
            <div className='pt-2'>
                {/* Search form */}
                <form onSubmit={handleSubmit} className="w-full px-2 sm:px-0 py-2">
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input type="search" id="default-search" value={query} onChange={(e) => setQuery(e.target.value)} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Movies and TvSeries..." />
                        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                    </div>
                </form>
            </div>
            {/* Conditional rendering based on loader */}
            {isloader ? (
                <div>
                    <div>
                        <h1 className='text-xl p-4 text-cyan-900'>Trending Movies</h1>
                        <Trending />
                    </div>
                    <hr />
                    <div>
                        <h1 className='text-xl px-4 py-2 text-cyan-900'>Recommand Movies</h1>
                        <Recomandmovies />
                    </div>
                    <hr />
                    <div>
                        <h1 className='text-xl px-4 py-2 text-cyan-900'>Recommand Tv Series</h1>
                        <Recomandseries />
                    </div>
                </div>
            ) : (
                <Preloader /> // Showing preloader while waiting for data to load
            )}
        </div>
    );
};

export default Homepage;
