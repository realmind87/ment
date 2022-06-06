import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const delay = (time, value) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value);
    }, time);
  });

export const userInfo = createAsyncThunk('auth/userInfo', async (thunkAPI) => {
  try {
    const response = await axios.get('/user');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const login = createAsyncThunk(
  'auth/login',
  async ({ userid, password }, thunkAPI) => {
    try {
      const response = await axios.post('/user/login', { userid, password });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const loginout = createAsyncThunk(
  'auth/logout',
  async ({}, thunkAPI) => {
    try {
      const response = await axios.post('/user/logout');
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ userid, email, password }, thunkAPI) => {
    try {
      const response = await axios.post('/user', {
        userid,
        email,
        password,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
