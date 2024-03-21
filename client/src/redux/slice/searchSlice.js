import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
    searchinput: []
}

const search = createSlice({
    name: 'search',
    initialState: initialstate,
    reducers: {
        setsearchinput: (state, action) => {
            state.searchinput = action.payload
        },

    }
})

export const { setsearchinput } = search.actions

export default search.reducer