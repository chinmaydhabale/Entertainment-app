import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setcontent } from '../../redux/slice/detailSlice';
import axiosInstance from '../../utils/axiosInstance';

const TvseriesCard = ({ Tvseriescontent, imageUrl, title, TvseriesId, isauth }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const bookmarkcheck = useSelector((state) => state.detail.seriesbookmarkdata);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [imageLoadError, setImageLoadError] = useState(false);

    useEffect(() => {
        // Function to check if the TV series is bookmarked
        const checkBookmarkStatus = (id) => {
            if (id && bookmarkcheck.includes(id)) {
                setIsBookmarked(true);
            } else {
                setIsBookmarked(false);
            }
        };

        // Check bookmark status if user is authenticated
        if (isauth) {
            checkBookmarkStatus(TvseriesId);
        }
    }, [TvseriesId, bookmarkcheck, isauth]);

    // Function to add TV series to bookmarks
    const Addtobookmark = async (id) => {
        try {
            const { data } = await axiosInstance.post(`/api/v1/data/bookmark/add`, { tvseriesId: id });
            if (data.success) {
                setIsBookmarked(true);
                toast.success("Bookmark Tvseries");
            } else {
                navigate('/login');
                toast.error('Login required');
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Function to remove TV series from bookmarks
    const removebookmark = async (id) => {
        try {
            const { data } = await axiosInstance.delete(`/api/v1/data/bookmark/remove/${id}`);
            if (data.success) {
                toast.success("Unbookmark Tvseries");
                setIsBookmarked(false);
            } else {
                navigate('/login');
                toast.error("Login required");
            }
        } catch (error) {
            console.log(error);
        }
    };

    // Function to navigate to TV series detail page
    const isPlay = () => {
        dispatch(setcontent(Tvseriescontent));
        navigate("/detail");
    };

    return (
        <div className="movie-card relative overflow-hidden group">
            {imageLoadError ? (
                <div className="placeholder-image w-full h-auto bg-gray-300 flex items-center justify-center">
                    <p className="text-gray-500">No Preview Image</p>
                </div>
            ) : (
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-auto object-cover"
                    onError={() => setImageLoadError(true)} // Handle image load error
                />
            )}
            {/* Bookmark button */}
            <div className="bookmark-icon absolute top-0 right-0 p-2 z-10">
                <button type="button" onClick={() => isBookmarked ? removebookmark(TvseriesId) : Addtobookmark(TvseriesId)}>
                    <FontAwesomeIcon icon={faBookmark} className={` ${isBookmarked ? 'text-yellow-500' : 'text-white'}`} />
                </button>
            </div>
            {/* Play button */}
            <div className="play-text absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <button className="bg-black text-white px-4 py-2 rounded-full" onClick={isPlay}>Play</button>
                {/* TV series type */}
                <div className="absolute top-0 left-0 bg-black bg-opacity-75 w-full py-2 px-4 ">
                    <p className="text-white text-sm truncate">{Tvseriescontent.type}</p>
                </div>
                {/* TV series title */}
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-75 w-full py-2 px-4 ">
                    <p className="text-white text-sm truncate">{title}</p>
                </div>
            </div>
        </div>
    );
};

export default TvseriesCard;
