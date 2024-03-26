import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../../component/Navbar';
import TvseriesCard from './TvseriesCard';
import axiosInstance from '../../utils/axiosInstance';
import { setTvbookmarkdata } from '../../redux/slice/detailSlice';

const TvSearch = () => {

    // Accessing the search input from Redux state
    const searchstate = useSelector((state) => state.search.searchinput)

    const dispatch = useDispatch()
    const [query, setQuery] = useState('');
    const [Search, setSearch] = useState(searchstate) // Storing search results

    const [isauth, setisauth] = useState(true)


    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            // Fetching TV series data based on search query
            const response = await axiosInstance.get(`/api/v1/data/series/search/${encodeURIComponent(query)}`);
            if (response.data.success) {
                setSearch(response.data.seriesdata) // Updating search results
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
        const checkBookmarkStatus = async () => {
            try {
                // Checking bookmark status for authentication user
                const { data } = await axiosInstance.get(`/api/v1/data/bookmark/check`);
                if (data.success) {
                    setisauth(true)
                    dispatch(setTvbookmarkdata(data.bookmarkseries)) // Updating TV series bookmark data
                } else {
                    setisauth(false)
                }
            } catch (error) {
                console.log(error);
            }
        };


        checkBookmarkStatus();

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
                    <input type="search" id="default-search" value={query} onChange={(e) => setQuery(e.target.value)} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Tvseries..." />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>

            {/* Displaying search results */}
            <div className="grid grid-cols-5 gap-4 px-4 sm:grid-cols-3 2sm:grid-cols-2 py-2">
                {
                    Search && Search.length !== 0 ? Search.map((data) => {
                        return <TvseriesCard
                            key={data._id}
                            Tvseriescontent={data}
                            title={data.title}
                            imageUrl={data.big_image}
                            TvseriesId={data._id}
                            isauth={isauth}
                        />
                    }) : <p>not found</p>
                }
            </div>

        </div>
    );
};

export default TvSearch;
