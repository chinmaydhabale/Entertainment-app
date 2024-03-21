import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setcontent } from '../../redux/slice/detailSlice';


const MovieCard = ({ movie, imageUrl, title, movieid }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        const checkBookmarkStatus = async () => {
            try {
                const { data } = await axios.post(`/api/v1/data/bookmark/check`, { movieId: movieid });
                setIsBookmarked(data.success);
            } catch (error) {
                console.log(error);
            }
        };

        checkBookmarkStatus();
    }, [movieid]);

    const Addtobookmark = async (id) => {
        try {
            const { data } = await axios.post('/api/v1/data/bookmark/add', { movieId: id })
            console.log(data)
            if (data.success) {
                setIsBookmarked(true);
                toast.success("Bookmark Movie")
            }
        } catch (error) {
            console.log(error)

        }
    }

    const removebookmark = async (id) => {
        try {
            const { data } = await axios.delete(`/api/v1/data/bookmark/remove/${id}`)
            if (data.success) {
                toast.success("UnBookmark Movie")
                setIsBookmarked(false)
            }
        } catch (error) {
            console.log(error)
        }
    }


    const isPlay = () => {
        dispatch(setcontent(movie))
        navigate("/detail")
    }


    return (
        <div className="movie-card relative overflow-hidden group">
            <img src={imageUrl} alt={title} className="w-full h-auto object-cover" />
            <button type='button' onClick={() => isBookmarked ? removebookmark(movieid) : Addtobookmark(movieid)} className={`bookmark-icon absolute top-0 right-0 p-2 z-10`}>
                <FontAwesomeIcon icon={faBookmark} className={` ${isBookmarked ? 'text-yellow-500' : 'text-white'}`} />
            </button>
            <div className="play-text absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <button className="bg-black text-white px-4 py-2 rounded-full" onClick={isPlay}>Play</button>
                <div className="absolute top-0 left-0 bg-black bg-opacity-75 w-full py-2 px-4 ">
                    <p className="text-white text-sm truncate">{movie.type}</p>
                </div>
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-75 w-full py-2 px-4 ">
                    <p className="text-white text-sm truncate">{title}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;

