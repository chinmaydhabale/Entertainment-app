import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
    content: null,
    moviebookmarkdata: [],
    seriesbookmarkdata: []
}

// Define a Redux slice named 'detail' with initial state and reducer functions
const detail = createSlice({
    name: 'detail',
    initialState: initialstate,
    reducers: {
        // Reducer function to set content in state
        setcontent: (state, action) => {
            state.content = action.payload
        },
        // Reducer function to set movie bookmark data in state
        setmbookmarkdata: (state, action) => {
            state.moviebookmarkdata = action.payload
        },
        // Reducer function to set TV series bookmark data in state
        setTvbookmarkdata: (state, action) => {
            state.seriesbookmarkdata = action.payload
        },
    }
})

// Export action creators generated by the detail slice
export const { setcontent, setmbookmarkdata, setTvbookmarkdata } = detail.actions

// Export the reducer function generated by the detail slice
export default detail.reducer
