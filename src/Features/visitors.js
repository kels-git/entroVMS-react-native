import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    visitors: []
}

export const visitorsSlice = createSlice({
    name: "visitors",
    initialState,
    reducers: {
        getVisitors: (state, action) => {
            state.visitors = action.payload;
        }
    }
})

export const {getVisitors}  = visitorsSlice.actions

export default visitorsSlice.reducer