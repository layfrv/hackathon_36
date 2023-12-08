import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
  name: 'gameSlice',
  initialState: {
    isStarted: false,
    isFinished: false,
  },
  reducers: {
    startGame: (state) => {
      state.isFinished = false;
      state.isStarted = true;
    },
    finishGame: (state) => {
      state.isFinished = true;
      state.isStarted = false;
    }
  }
});

export const {startGame, finishGame} = gameSlice.actions;

export default gameSlice.reducer;