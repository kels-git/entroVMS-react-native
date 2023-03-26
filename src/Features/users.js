import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    profile: {},
    accessId: "",
    isLoggedIn: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.profile = action.payload;
            state.isLoggedIn = true;
        },
        logoutUser: (state) => {
            state.isLoggedIn = false;
        },
        updateUser: (state, action) => {
            state.profile = action.payload;
        },
        setAccessId: (state, action) => {
            state.accessId = action.payload;
        }
    }
});

export const {loginUser, updateUser, logoutUser, setAccessId}  = userSlice.actions
export default userSlice.reducer
