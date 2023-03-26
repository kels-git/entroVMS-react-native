import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cards: [],
    defaultCard: {}
}

export const virtualCardSlice = createSlice({
    name: "virtualcards",
    initialState,
    reducers: {
        addCard: (state, action) => {
            if(action.payload){
                state.cards = action.payload;
            }else{
                state.cards = [];
            }
        },
        setDefaultCard: (state, action) => {
            state.defaultCard = action.payload
        }
    }
})

export const {addCard, setDefaultCard}  = virtualCardSlice.actions

export default virtualCardSlice.reducer