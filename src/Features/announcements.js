import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    announcements: []
}

export const announcementSlice = createSlice({
    name: "announcement",
    initialState,
    reducers: {
        addAnnouncement: (state, action) => {
            state.announcements = action.payload;
        }
    }
})

export const {addAnnouncement}  = announcementSlice.actions

export default announcementSlice.reducer