import { createSlice } from '@reduxjs/toolkit';

export const librarySlice = createSlice({
  name: 'library',
  initialState: {
    deviceType: null,
  },
  reducers: {
    device: (state, action) => {
      console.log( action.payload );
      state.deviceType = action.payload;
      return state;
    },
  }
});

export const { device } = librarySlice.actions;
export const librarySelector = (state) => state.library;
