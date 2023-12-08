import { configureStore } from '@reduxjs/toolkit';
import gameSlice from './features/gameSlice';
import resultSlice from './features/resultSlice';
import userSlice from './features/userSlice';

const saveToLocalStorage = (store) => (next) => (action) => {
  const result = next(action);
  const isFinished = store.getState().game.isFinished; 
  if (isFinished) {
    const memoryGame = (store.getState().result);
    localStorage.setItem('memoryGame', JSON.stringify(memoryGame)); 
  }
  return result;
};

export const store = configureStore({
  reducer: {
    game: gameSlice,
    user: userSlice,
    result: resultSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(saveToLocalStorage),
});
