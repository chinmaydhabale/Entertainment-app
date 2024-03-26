import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setcontent } from '../../../redux/slice/detailSlice';
import axiosInstance from '../../../utils/axiosInstance';

const RecomandMcard = ({ movie, isauth }) => {
    // Redux hooks for dispatching actions and selecting state
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const bookmarkcheck = useSelector((state) => state.detail.moviebookmarkdata);

    // State to manage bookmark status
    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        // Function to check if the movie is bookmarked
        const checkBookmarkStatus = (id) => {
            if (id && bookmarkcheck.includes(id)) {
                setIsBookmarked(true);
            } else {
                setIsBookmarked(false);
            }
        };

        // Check bookmark status when the component mounts or movie ID changes
        if (isauth) {
            checkBookmarkStatus(movie._id);
        }
    }, [movie._id, bookmarkcheck, isauth]);

    // Function to add a movie to bookmarks
    const Addtobookmark = async (id) => {
        try {
            const { data } = await axiosInstance.post(`/api/v1/data/bookmark/add`, { movieId: id });

            if (data.success) {
                setIsBookmarked(true);
                toast.success("Movie bookmarked");
            } else {
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Function to remove a movie from bookmarks
    const removebookmark = async (id) => {
        try {
            const { data } = await axiosInstance.delete(`/api/v1/data/bookmark/remove/${id}`);
            if (data.success) {
                toast.success("Movie Unbookmark");
                setIsBookmarked(false);
            } else {
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Function to handle clicking on the play button
    const isPlay = () => {
        // Dispatch action to set content details in Redux state and navigate to detail page
        dispatch(setcontent(movie));
        navigate("/detail");
    };

    return (
        <div className="movie-card relative overflow-hidden group">
            {/* Movie image */}
            <img src={movie.big_image} alt={movie.title} className="w-full h-auto object-cover" />

            {/* Bookmark icon */}
            <button onClick={() => isBookmarked ? removebookmark(movie._id) : Addtobookmark(movie._id)} className="bookmark-icon absolute top-0 right-0 p-2 z-10">
                <FontAwesomeIcon icon={faBookmark} className={` ${isBookmarked ? 'text-yellow-500' : 'text-white'}`} />
            </button>

            {/* Play button and movie information */}
            <div className="play-text absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <button className="bg-black text-white px-4 py-2 rounded-full" onClick={isPlay}>Play</button>
                <div className="absolute top-0 left-0 bg-black bg-opacity-75 w-full py-2 px-4 ">
                    <p className="text-white text-sm truncate">{movie.type}</p>
                </div>
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-75 w-full py-2 px-4 ">
                    <p className="text-white text-sm truncate">{movie.title}</p>
                </div>
            </div>
        </div>
    );
};

export default RecomandMcard;
