import React, { useEffect, useState } from 'react';
import Navbar from '../../component/Navbar';
import MBookmarkcard from './MBookmarkcard';
import TVbookmarkcard from './TVbookmarkcard';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setsearchinput } from '../../redux/slice/searchSlice';
import Loader from '../../component/Loader';

const Bookmark = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [query, setQuery] = useState('');
    const [bookmark, setBookmark] = useState(null);

    const getBookmark = async () => {
        try {
            const { data } = await axios.get('/api/v1/data/bookmark');
            if (data.success) {
                setBookmark(data.bookmark);
            }
        } catch (error) {
            if (!error.response.data.success) {
                navigate('/login');
            }
            console.log(error);
        }
    };

    const removeBookmarkCard = (id, isMovie) => {
        setBookmark(prevState => ({
            ...prevState,
            bookmarkmovie: prevState.bookmarkmovie.filter(movie => movie._id !== id),
            bookmarkseries: prevState.bookmarkseries.filter(series => series._id !== id)
        }));
    };

    useEffect(() => {
        getBookmark();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        try {
            const response = await axios.get(`/api/v1/data/bookmark/search/${encodeURIComponent(query)}`);
            if (response.data.success) {
                dispatch(setsearchinput(response.data.searchData))
                navigate('/search/bookmark')
            } else {
                // Handle no results found
                console.log(response.data.message);
            }
        } catch (error) {
            console.error(error);
            // Handle error
        }
    };



    return (
        <div>
            <Navbar />
            <form onSubmit={handleSubmit} className="w-full px-2 sm:px-0 py-2">
                <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="default-search" value={query} onChange={(e) => setQuery(e.target.value)} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Bookmark shows..." />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>
            <div className="container mx-auto py-2 ">
                <h1 className='px-4 pb-2 text-xl text-cyan-600'>Bookmark Movies</h1>
                <div className="grid grid-cols-5 gap-4 px-4 sm:grid-cols-3 2sm:grid-cols-2">
                    {bookmark ? bookmark.bookmarkmovie.length !== 0 ? (
                        bookmark.bookmarkmovie.map((movie, index) => (
                            <MBookmarkcard key={index} movie={movie} removeBookmarkCard={removeBookmarkCard} />
                        ))
                    ) : <p>No Bookmark Movie Found</p> : (
                        <Loader />
                    )}
                </div>
                <h1 className='p-4 text-xl text-cyan-600'>Bookmark Tvseries</h1>
                <div className="grid grid-cols-5 gap-4 px-4 sm:grid-cols-3 2sm:grid-cols-2">
                    {bookmark ? bookmark.bookmarkseries.length !== 0 ? (
                        bookmark.bookmarkseries.map((series, index) => (
                            <TVbookmarkcard key={index} series={series} removeBookmarkCard={removeBookmarkCard} />
                        ))
                    ) : <p>No Bookmark Tv Series Found</p> : (
                        <Loader />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Bookmark;


