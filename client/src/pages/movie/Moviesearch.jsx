import React, { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../component/Navbar';
import Preloader from '../../component/Preloader'
import axiosInstance from '../../utils/axiosInstance';
import { setmbookmarkdata } from '../../redux/slice/detailSlice';

const Moviesearch = () => {
    // Get search input from Redux store
    const searchstate = useSelector((state) => state.search.searchinput);

    const dispatch = useDispatch();
    const [query, setQuery] = useState('');
    const [Search, setSearch] = useState(searchstate); // State to store search results
    const [isauth, setisauth] = useState(true); // State to track authentication status

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            const response = await axiosInstance.get(`/api/v1/data/movie/search/${encodeURIComponent(query)}`);
            if (response.data.success) {
                setSearch(response.data.moviedata); // Update search results
            } else {
                // Handle no results found
                console.log(response.data.message);
            }
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };

    // Check bookmark status when component mounts
    useEffect(() => {
        const checkBookmarkStatus = async () => {
            try {
                const { data } = await axiosInstance.get(`/api/v1/data/bookmark/check`);
                if (data.success) {
                    setisauth(true); // User is authenticated
                    dispatch(setmbookmarkdata(data.bookmarkmovie)); // Set bookmark data in Redux store
                } else {
                    setisauth(false); // User is not authenticated
                }
            } catch (error) {
                console.log(error);
            }
        };

        checkBookmarkStatus(); // Call the function to check bookmark status

    }, []);

    return (
        <div>
            <Navbar />

            {/* Search form */}
            <form onSubmit={handleSubmit} className="w-full px-2 sm:px-0 py-2">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="default-search" value={query} onChange={(e) => setQuery(e.target.value)} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Movies..." />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>

            {/* Display search results */}
            <div className="grid grid-cols-5 gap-4 px-4 sm:grid-cols-3 2sm:grid-cols-2 py-2">
                {
                    // Check if search results are available
                    Search ? (
                        // Check if search results are not empty
                        Search.length !== 0 ? (
                            // Map through search results and render MovieCard for each movie
                            Search.map((data) => (
                                <MovieCard
                                    key={data._id}
                                    movie={data}
                                    title={data.title}
                                    imageUrl={data.image}
                                    movieid={data._id}
                                    isauth={isauth}
                                />
                            ))
                        ) : (
                            // Display "not found" message if search results are empty
                            <p>not found</p>
                        )
                    ) : (
                        // Display preloader if search results are not yet available
                        <Preloader />
                    )
                }
            </div>
        </div>
    );
};

export default Moviesearch;
