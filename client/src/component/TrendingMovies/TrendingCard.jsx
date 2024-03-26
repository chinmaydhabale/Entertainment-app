import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setcontent } from '../../redux/slice/detailSlice';
import axiosInstance from '../../utils/axiosInstance';

const TrendingCard = ({ movie, isauth }) => {
    const dispatch = useDispatch(); // Initializing useDispatch hook to dispatch actions
    const navigate = useNavigate(); // Initializing useNavigate hook to navigate programmatically
    const bookmarkcheck = useSelector((state) => state.detail.moviebookmarkdata); // Getting movie bookmark data from Redux store

    const [isBookmarked, setIsBookmarked] = useState(false); // State variable to track bookmark status

    useEffect(() => {
        // Function to check bookmark status
        const checkBookmarkStatus = (id) => {
            if (id && bookmarkcheck.includes(id)) {
                setIsBookmarked(true); // If movie is bookmarked, set isBookmarked to true
            } else {
                setIsBookmarked(false); // If movie is not bookmarked, set isBookmarked to false
            }
        };

        if (isauth) {
            checkBookmarkStatus(movie._id); // Checking bookmark status when isauth changes or movie id changes
        }
    }, [movie._id, bookmarkcheck, isauth]);

    // Function to add movie to bookmarks
    const Addtobookmark = async (id) => {
        try {
            const { data } = await axiosInstance.post(`/api/v1/data/bookmark/add`, { movieId: id }); // Making API call to add movie to bookmarks
            if (data.success) {
                setIsBookmarked(true); // Setting isBookmarked to true after successfully adding movie to bookmarks
                toast.success("Bookmark Movie"); // Displaying success toast message
            } else {
                navigate("/login"); // Redirecting to login page if user is not authenticated
            }
        } catch (error) {
            console.log(error); // Logging error if API call fails
        }
    };

    // Function to remove movie from bookmarks
    const removebookmark = async (id) => {
        try {
            const { data } = await axiosInstance.delete(`/api/v1/data/bookmark/remove/${id}`); // Making API call to remove movie from bookmarks
            if (data.success) {
                toast.success("UnBookmark Movie"); // Displaying success toast message
                setIsBookmarked(false); // Setting isBookmarked to false after successfully removing movie from bookmarks
            } else {
                navigate("/login"); // Redirecting to login page if user is not authenticated
            }
        } catch (error) {
            console.log(error); // Logging error if API call fails
        }
    };

    // Function to handle play button click
    const isPlay = () => {
        dispatch(setcontent(movie)); // Dispatching action to set content details in Redux store
        navigate("/detail"); // Navigating to detail page
    };

    return (
        <div className="movie-card relative flex-shrink-0 w-[20%] sm:w-[30%] 2sm:w-[40%] h-auto mx-2 overflow-hidden group">
            <img src={movie.big_image} alt={movie.title} className="w-full h-full object-cover" />
            {/* Bookmark icon button */}
            <button onClick={() => isBookmarked ? removebookmark(movie._id) : Addtobookmark(movie._id)} className="bookmark-icon absolute top-0 right-0 p-2 z-10">
                <FontAwesomeIcon icon={faBookmark} className={` ${isBookmarked ? 'text-yellow-500' : 'text-white'}`} />
            </button>
            {/* Play button */}
            <div className="play-text absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <button className="bg-black text-white px-4 py-2 rounded-full" onClick={isPlay}>Play</button>
                {/* Movie type */}
                <div className="absolute top-0 left-0 bg-black bg-opacity-75 w-full py-2 px-4 ">
                    <p className="text-white text-sm truncate">{movie.type}</p>
                </div>
                {/* Movie title */}
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-75 w-full py-2 px-4 ">
                    <p className="text-white text-sm truncate">{movie.title}</p>
                </div>
            </div>
        </div>
    );
};

export default TrendingCard;
