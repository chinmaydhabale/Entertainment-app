import React, { useEffect, useState } from 'react';
import RecomandMcard from './RecomandMcard'; // Importing the child component
import { useNavigate } from 'react-router-dom';
import Loader from '../../Loader';
import axiosInstance from '../../../utils/axiosInstance';
import { useDispatch } from 'react-redux';
import { setmbookmarkdata } from '../../../redux/slice/detailSlice';

// Parent component for rendering recommended movies
const Recomandmovies = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isauth, setisauth] = useState(true); // State to track authentication status
    const [rmovies, setrMovies] = useState(); // State to store recommended movies

    // Function to fetch recommended movies from the server
    const getmovies = async () => {
        try {
            const { data } = await axiosInstance.get('/api/v1/data/recomand/movies');
            if (data.success) {
                setrMovies(data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    // useEffect hook to fetch recommended movies on component mount
    useEffect(() => {
        getmovies();
    }, []);

    // useEffect hook to check bookmark status on component mount
    useEffect(() => {
        // Function to check the bookmark status
        const checkBookmarkStatus = async () => {
            try {
                const { data } = await axiosInstance.get(`/api/v1/data/bookmark/check`);
                if (data.success) {
                    setisauth(true);
                    dispatch(setmbookmarkdata(data.bookmarkmovie));
                } else {
                    setisauth(false);
                }
            } catch (error) {
                console.log(error);
            }
        };

        // Call the function to check bookmark status
        checkBookmarkStatus();
    }, []);

    // Render the recommended movies or loader component
    return (
        <div className="container mx-auto py-8 ">
            <div className="grid grid-cols-5 gap-4 px-4 sm:grid-cols-3 2sm:grid-cols-2">
                {rmovies ? rmovies.recomandmovies.map(movie => (
                    // Render the RecomandMcard child component for each recommended movie
                    <RecomandMcard key={movie._id} movie={movie} isauth={isauth} />
                )) : <Loader />} {/* Render Loader component if rmovies is not yet fetched */}
            </div>
        </div>
    );
};

export default Recomandmovies; 
