import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setcontent } from '../../redux/slice/detailSlice';

const TVbookmarkcard = ({ series, removeBookmarkCard }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const removebookmark = async (id) => {
        try {
            const { data } = await axios.delete(`/api/v1/data/bookmark/remove/${id}`)
            if (data.success) {
                removeBookmarkCard(id)
                toast.success("UnBookmark")
            }
        } catch (error) {
            console.log(error)
            toast.error("Already remove in bookmark")
        }
    }


    const isPlay = () => {
        dispatch(setcontent(series))
        navigate("/detail")
    }

    return (
        <div className="movie-card relative overflow-hidden group">
            <img src={series.big_image} alt={series.title} className="w-full h-full object-cover" />
            <button onClick={() => removebookmark(series._id)} className="bookmark-icon absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 z-10">
                <FontAwesomeIcon icon={faBookmark} className="text-yellow-500" />
            </button>
            <div className="play-text absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <button className="bg-black text-white px-4 py-2 rounded-full" onClick={isPlay}>Play</button>
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-75 w-full py-2 px-4 ">
                    <p className="text-white text-sm truncate">{series.title}</p>
                </div>
            </div>
        </div>
    )
}

export default TVbookmarkcard