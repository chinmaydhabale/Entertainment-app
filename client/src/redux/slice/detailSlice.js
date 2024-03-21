import { createSlice } from "@reduxjs/toolkit";

const initialstate = {
    content: null,
}

const detail = createSlice({
    name: 'detail',
    initialState: initialstate,
    reducers: {
        setcontent: (state, action) => {
            state.content = action.payload
        }
    }
})

export const { setcontent } = detail.actions

export default detail.reducer