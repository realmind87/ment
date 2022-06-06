import { createAsyncThunk } from '@reduxjs/toolkit';

export const getDevice = createAsyncThunk('library/device', async (device, thunkAPI) => {
  try {
    return device;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
