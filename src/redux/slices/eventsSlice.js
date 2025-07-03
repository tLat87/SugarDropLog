// src/redux/challengesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const challengesSlice = createSlice({
    name: 'challenges',
    initialState: [], // Initial state is an empty array of challenges
    reducers: {
        addChallenge: (state, action) => {
            // The payload will be the challenge object with the addedDate
            state.push(action.payload);
        },
        removeChallenge: (state, action) => {
            // action.payload will contain { title, addedDate } to uniquely identify the challenge
            return state.filter(challenge =>
                !(challenge.title === action.payload.title && challenge.addedDate === action.payload.addedDate)
            );
        },
        removeAllChallenges: (state) => {
            state.length = 0; // This clears the array
        },
    },
});

export const { addChallenge, removeChallenge, removeAllChallenge } = challengesSlice.actions;
export default challengesSlice.reducer;
