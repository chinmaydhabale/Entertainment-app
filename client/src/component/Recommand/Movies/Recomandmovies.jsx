import React, { useEffect, useState } from 'react';
import axios from 'axios'
import RecomandMcard from './RecomandMcard';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Loader';


const Recomandmovies = () => {

    const navigate = useNavigate()

    const [rmovies, setrMovies] = useState()

    const getmovies = async () => {
        try {
            const { data } = await axios.get('/api/v1/data/recomand/movies')
            if (data.success) {
                setrMovies(data)
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
        <div className="container mx-auto py-8 ">
            <div className="grid grid-cols-5 gap-4 px-4 sm:grid-cols-3 2sm:grid-cols-2">
                {rmovies ? rmovies.recomandmovies.map(movie => (
                    <RecomandMcard key={movie._id} movie={movie} />
                )) : <Loader />}
            </div>
        </div>
    );
};

export default Recomandmovies;
