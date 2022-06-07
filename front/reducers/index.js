import { combineReducers } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { userSlice } from './slices/user';
import { postSlice } from './slices/post';
import { librarySlice } from './slices/library';

import axios from 'axios';
//axios.defaults.baseURL = 'http://east-zero.com:3065/';
axios.defaults.baseURL = 'http://3.39.21.89/';
//axios.defaults.baseURL = 'http://localhost:80/';
axios.defaults.withCredentials = true;

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return combineReducers({
    user: userSlice.reducer,
    post: postSlice.reducer,
    library: librarySlice.reducer,

  })(state, action);
};

export default reducer;
