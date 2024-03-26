import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setcontent } from '../../redux/slice/detailSlice';
import axiosInstance from '../../utils/axiosInstance';



const TvseriesCard = ({ Tvseriescontent, imageUrl, title, TvseriesId, isauth }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const bookmarkcheck = useSelector((state) => state.detail.seriesbookmarkdata)

    const [isBookmarked, setIsBookmarked] = useState(false);

    useEffect(() => {
        const checkBookmarkStatus = (id) => {
            if (id && bookmarkcheck.includes(id)) {
                setIsBookmarked(true)
            } else {
                setIsBookmarked(false)
            }
        };

        if (isauth) {
            checkBookmarkStatus(TvseriesId);
        }

    }, [TvseriesId]);



    const Addtobookmark = async (id) => {
        try {
            const { data } = await axiosInstance.post(`/api/v1/data/bookmark/add`, { tvseriesId: id })
            if (data.success) {
                setIsBookmarked(true)
                toast.success("Bookmark Tvseries")
            } else {
                navigate('/login')
                toast.error('login required')
            }
        } catch (error) {

            console.log(error)
        }

    }


    const removebookmark = async (id) => {
        try {
            const { data } = await axiosInstance.delete(`/api/v1/data/bookmark/remove/${id}`)
            if (data.success) {
                toast.success("UnBookmark Tvseries")
                setIsBookmarked(false)
            } else {
                navigate('/login')
                toast.error("login required")
            }
        } catch (error) {

            console.log(error)
        }

    }

    const isPlay = () => {
        dispatch(setcontent(Tvseriescontent))
        navigate("/detail")
    }


    return (
        <div className="movie-card relative overflow-hidden group">
            <img src={imageUrl} alt={title} className="w-full h-auto object-cover" />
            <div className="bookmark-icon absolute top-0 right-0 p-2 z-10">
                <button type="button" onClick={() => isBookmarked ? removebookmark(TvseriesId) : Addtobookmark(TvseriesId)}>
                    <FontAwesomeIcon icon={faBookmark} className={` ${isBookmarked ? 'text-yellow-500' : 'text-white'}`} />
                </button>
            </div>
            <div className="play-text absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <button className="bg-black text-white px-4 py-2 rounded-full" onClick={isPlay}>Play</button>
                <div className="absolute top-0 left-0 bg-black bg-opacity-75 w-full py-2 px-4 ">
                    <p className="text-white text-sm truncate">{Tvseriescontent.type}</p>
                </div>
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-75 w-full py-2 px-4 ">
                    <p className="text-white text-sm truncate">{title}</p>
                </div>
            </div>
        </div>
    )
}

export default TvseriesCard