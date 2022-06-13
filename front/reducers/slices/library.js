import { createSlice } from '@reduxjs/toolkit';

export const librarySlice = createSlice({
  name: 'library',
  initialState: {
    deviceType: null,
    isLoading: false,
    keyword: null
  },
  reducers: {
    device: (state, action) => {
      state.deviceType = action.payload;
      return state;
    },
    loading: (state, action) => {
      state.isLoading = action.payload;
      return state;
    },
    getKeyword: (state, action) => {
      state.keyword = action.payload;
      return state;
    },
  }
});

export const { device, loading, getKeyword } = librarySlice.actions;
export const librarySelector = (state) => state.library;
