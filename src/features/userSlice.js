import { createSlice } from '@reduxjs/toolkit';

const loadNameFromLS = () => {
  try {
    const savedData = localStorage.getItem('memoryGameName');
    if (savedData === null) {
      return null;
    }
    return savedData;
  }
  catch(error) {
    console.log(error);
    return null;
  }
};

const nameFromLs = loadNameFromLS();
let name = nameFromLs ? nameFromLs : '';

const userSlice = createSlice({
  name: 'userSlice',
  initialState: {
    name,
  },
  reducers: {
    saveName: (state, action) => {
      state.name = action.payload;
      localStorage.setItem('memoryGameName', action.payload);
    },

  }
});

export const {saveName} = userSlice.actions;

export default userSlice.reducer;