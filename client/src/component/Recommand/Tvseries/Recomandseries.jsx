import React, { useEffect, useState } from 'react';
import axios from 'axios'
import RecomandScard from './RecomandScard';
import { useNavigate } from 'react-router-dom';
import Loader from '../../Loader';

const Recomandseries = () => {

    const navigate = useNavigate()

    const [rseries, setrSeries] = useState()

    const getseries = async () => {
        try {
            const { data } = await axios.get('/api/v1/data/recomand/tvseries')
            if (data.success) {
                setrSeries(data)
            }
        } catch (error) {
            if (!error.response.data.success) {
                navigate('/login')
            }
            console.log(error)
        }
    }

    useEffect(() => {
        getseries()
    }, [])

    return (
        <div className="container mx-auto py-8 ">
            <div className="grid grid-cols-5 gap-4 px-4 sm:grid-cols-3 2sm:grid-cols-2">
                {rseries ? rseries.recomandseries.map(series => (
                    <RecomandScard key={series._id} series={series} />
                )) : <Loader />}
            </div>
        </div>
    );
};

export default Recomandseries;
