import { configureStore } from '@reduxjs/toolkit';
import detailSlice from '../slice/detailSlice';
import searchSlice from '../slice/searchSlice';

// Configure Redux store with reducers for detail and search slices
export default configureStore({
    reducer: {
        detail: detailSlice,
        search: searchSlice,
    },
});
