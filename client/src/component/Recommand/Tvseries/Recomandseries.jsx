import React, { useEffect, useState } from 'react';
import RecomandScard from './RecomandScard'; // Importing child component
import Loader from '../../Loader';
import axiosInstance from '../../../utils/axiosInstance';
import { useDispatch } from 'react-redux';
import { setTvbookmarkdata } from '../../../redux/slice/detailSlice';

const Recomandseries = () => {

    const dispatch = useDispatch()

    const [isauth, setisauth] = useState(true)

    const [rseries, setrSeries] = useState()

    // Fetching recommended TV series
    const getseries = async () => {
        try {
            const { data } = await axiosInstance.get('/api/v1/data/recomand/tvseries');
            if (data.success) {
                setrSeries(data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getseries();
    }, []);

    // Checking bookmark status when component mounts
    useEffect(() => {
        const checkBookmarkStatus = async () => {
            try {
                const { data } = await axiosInstance.get(`/api/v1/data/bookmark/check`);
                if (data.success) {
                    dispatch(setTvbookmarkdata(data.bookmarkseries));
                    setisauth(true);
                } else {
                    setisauth(false);
                }
            } catch (error) {
                console.log(error);
            }
        };

        checkBookmarkStatus();

    }, []); // Empty dependency array to run only once on mount

    // Rendering recommended TV series or loader component
    return (
        <div className="container mx-auto py-8 ">
            <div className="grid grid-cols-5 gap-4 px-4 sm:grid-cols-3 2sm:grid-cols-2">
                {rseries ? rseries.recomandseries.map(series => (
                    <RecomandScard key={series._id} series={series} isauth={isauth} />
                )) : <Loader />} {/* Showing loader component if data is not yet fetched */}
            </div>
        </div>
    );
};

export default Recomandseries;
