import { createSlice } from '@reduxjs/toolkit';

const loadLeaderboardFromLS = () => {
  try {
    const savedData = JSON.parse(localStorage.getItem('memoryGame'));
    if (savedData === null) {
      return null;
    }
    const leaderboard = savedData.leaderboard.length > 0 && savedData.leaderboard.length <= 10 ? savedData.leaderboard : [];
    return leaderboard;
  } catch (error) {
    return null;
  }
};

const leaderboardFromLs = loadLeaderboardFromLS();
let leaderboard = leaderboardFromLs ? leaderboardFromLs : [];

const resultSlice = createSlice({
  name: 'resultSlice',
  initialState: {
    score: 0,
    time: 0,
    leaderboard
  },
  reducers: {
    saveTime: (state, action) => {
      state.time = action.payload;
    },
    saveScore: (state, action) => {
      state.score = action.payload;
    },
    addToLeaderboard: (state, action) => {
      if (state.leaderboard.length > 10) {
        state.leaderboard = [];
      }
      let result = {name: action.payload, score: state.score, time: state.time};
      state.leaderboard.push(result);
    }
  }
});

export const {saveTime, saveScore, addToLeaderboard} = resultSlice.actions;

export default resultSlice.reducer;