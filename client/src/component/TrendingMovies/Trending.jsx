import React, { useEffect, useState } from 'react';
import TrendingCard from './TrendingCard'; // Importing the child component
import Loader from '../Loader'; // Importing the Loader component
import axiosInstance from '../../utils/axiosInstance'; // Importing axiosInstance for API calls
import { useDispatch } from 'react-redux'; // Importing useDispatch from react-redux
import { setmbookmarkdata } from '../../redux/slice/detailSlice'; // Importing setmbookmarkdata action from Redux slice

const Trending = () => {
    const dispatch = useDispatch(); // Initializing useDispatch hook to dispatch actions

    // State variables
    const [trend, setTrend] = useState(); // State variable to store trending movies data
    const [isauth, setisauth] = useState(true); // State variable to check user authentication status

    // Function to fetch trending movies data
    const getmovies = async () => {
        try {
            const { data } = await axiosInstance.get('/api/v1/data/trending/movies'); // Making API call to fetch trending movies data
            if (data.success) {
                setTrend(data); // Setting trending movies data to state
            }
        } catch (error) {
            console.log(error); // Logging error if API call fails
        }
    };

    // useEffect hook to fetch trending movies data on component mount
    useEffect(() => {
        getmovies(); // Fetching trending movies data
    }, []);

    // useEffect hook to check user's bookmark status on component mount
    useEffect(() => {
        const checkBookmarkStatus = async () => {
            try {
                const { data } = await axiosInstance.get(`/api/v1/data/bookmark/check`); // Making API call to check user's bookmark status
                if (data.success) {
                    dispatch(setmbookmarkdata(data.bookmarkmovie)); // Dispatching action to set bookmarked movies data in Redux store
                    setisauth(true); // Setting authentication status to true
                } else {
                    setisauth(false); // Setting authentication status to false if user is not authenticated
                }
            } catch (error) {
                console.log(error); // Logging error if API call fails
            }
        };

        checkBookmarkStatus(); // Checking user's bookmark status
    }, []);

    return (
        <div className="movie-slider flex overflow-x-auto px-3 pb-4">
            {trend ? ( // Conditional rendering: Display Loader if trend is null, otherwise render TrendingCard components
                trend.trendingMovies.map(movie => (
                    <TrendingCard key={movie._id} movie={movie} isauth={isauth} /> // Rendering TrendingCard component for each trending movie
                ))
            ) : (
                <Loader /> // Rendering Loader component if trend is null
            )}
        </div>
    );
};

export default Trending; // Exporting the Trending component
