import { configureStore } from '@reduxjs/toolkit';
import detailSlice from '../slice/detailSlice';
import searchSlice from '../slice/searchSlice';


export default configureStore({
    reducer: {
        detail: detailSlice,
        search: searchSlice
    },
});