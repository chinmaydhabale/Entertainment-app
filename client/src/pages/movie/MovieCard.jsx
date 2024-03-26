import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setcontent } from '../../redux/slice/detailSlice';
import axiosInstance from '../../utils/axiosInstance';

const MovieCard = ({ movie, imageUrl, title, movieid, isauth }) => {
    const dispatch = useDispatch(); // Redux dispatch hook
    const navigate = useNavigate(); // Navigation hook
    const bookmarkcheck = useSelector((state) => state.detail.moviebookmarkdata); // Get movie bookmark data from Redux store

    const [isBookmarked, setIsBookmarked] = useState(false); // State to track bookmark status

    // Check if the movie is bookmarked when the component mounts or when movieid changes
    useEffect(() => {
        const checkBookmarkStatus = (id) => {
            if (id && bookmarkcheck.includes(id)) {
                setIsBookmarked(true); // Movie is bookmarked
            } else {
                setIsBookmarked(false); // Movie is not bookmarked
            }
        };

        if (isauth) {
            checkBookmarkStatus(movieid); // Check bookmark status if user is authenticated
        }
    }, [movieid, bookmarkcheck, isauth]);

    // Function to add movie to bookmarks
    const Addtobookmark = async (id) => {
        try {
            const { data } = await axiosInstance.post(`/api/v1/data/bookmark/add`, { movieId: id });
            if (data.success) {
                setIsBookmarked(true); // Update bookmark status
                toast.success("Bookmark Movie"); // Display success message
            } else {
                navigate('/login'); // Redirect to login page if not authenticated
                toast.error('login required'); // Display error message
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Function to remove movie from bookmarks
    const removebookmark = async (id) => {
        try {
            const { data } = await axiosInstance.delete(`/api/v1/data/bookmark/remove/${id}`);
            if (data.success) {
                setIsBookmarked(false); // Update bookmark status
                toast.success("UnBookmark Movie"); // Display success message
            } else {
                navigate('/login'); // Redirect to login page if not authenticated
                toast.error('login required'); // Display error message
            }
        } catch (error) {
            if (!error.response.data.success) {
                navigate('/login'); // Redirect to login page if not authenticated
            }
            console.log(error);
        }
    };

    // Function to handle play button click
    const isPlay = () => {
        dispatch(setcontent(movie)); // Set movie content in Redux store
        navigate("/detail"); // Navigate to movie detail page
    };

    return (
        <div className="movie-card relative overflow-hidden group">
            {/* Movie image */}
            <img src={imageUrl} alt={title} className="w-full h-auto object-cover" />
            {/* Bookmark button */}
            <button type='button' onClick={() => isBookmarked ? removebookmark(movieid) : Addtobookmark(movieid)} className={`bookmark-icon absolute top-0 right-0 p-2 z-10`}>
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
                    <p className="text-white text-sm truncate">{title}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
