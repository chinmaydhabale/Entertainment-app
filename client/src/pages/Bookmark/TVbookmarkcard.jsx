import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setcontent } from '../../redux/slice/detailSlice';
import axiosInstance from '../../utils/axiosInstance';

const TVbookmarkcard = ({ series, removeBookmarkCard }) => {

    const dispatch = useDispatch(); // Initializing useDispatch hook to dispatch actions
    const navigate = useNavigate(); // Initializing useNavigate hook to navigate programmatically

    // Function to remove bookmark
    const removebookmark = async (id) => {
        try {
            const { data } = await axiosInstance.delete(`/api/v1/data/bookmark/remove/${id}`); // Making API call to remove bookmark
            if (data.success) {
                removeBookmarkCard(id); // Removing bookmark card from UI
                toast.success("UnBookmark"); // Showing success toast message
            }
        } catch (error) {
            console.log(error);
            toast.error("Already remove in bookmark"); // Showing error toast message if bookmark removal fails
        }
    };

    // Function to handle play button click
    const isPlay = () => {
        dispatch(setcontent(series)); // Dispatching action to set content in Redux store
        navigate("/detail"); // Navigating to detail page
    };

    return (
        <div className="movie-card relative overflow-hidden group">
            <img src={series.big_image} alt={series.title} className="w-full h-full object-cover" />
            {/* Remove bookmark button */}
            <button onClick={() => removebookmark(series._id)} className="bookmark-icon absolute top-0 right-0 p-2 z-10">
                <FontAwesomeIcon icon={faBookmark} className="text-yellow-500" />
            </button>
            {/* Play button and series title */}
            <div className="play-text absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <button className="bg-black text-white px-4 py-2 rounded-full" onClick={isPlay}>Play</button>
                {/* TV series type */}
                <div className="absolute top-0 left-0 bg-black bg-opacity-75 w-full py-2 px-4 ">
                    <p className="text-white text-sm truncate">{series.type}</p>
                </div>
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-75 w-full py-2 px-4 ">
                    <p className="text-white text-sm truncate">{series.title}</p>
                </div>
            </div>
        </div>
    );
};

export default TVbookmarkcard; // Exporting TVbookmarkcard component
