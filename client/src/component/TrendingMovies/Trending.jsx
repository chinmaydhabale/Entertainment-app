import React, { useEffect, useState } from 'react';
import TrendingCard from './TrendingCard';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';


const Trending = () => {

    const navigate = useNavigate()

    const [trend, setTrend] = useState()

    const getmovies = async () => {
        try {
            const { data } = await axios.get('/api/v1/data/trending/movies')
            if (data.success) {
                setTrend(data)
            }
        } catch (error) {
            if (!error.response.data.success) {
                navigate('/login')
            }
            console.log(error)
        }
    }

    useEffect(() => {
        getmovies()
    }, [])

    return (
        <div className="movie-slider flex overflow-x-auto px-3 pb-4 ">
            {trend ? trend.trendingMovies.map(movie => (
                <TrendingCard key={movie._id} movie={movie} />
            )) : <Loader />}
        </div>
    );
};

export default Trending;
