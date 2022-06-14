import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const delay = (time, value) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(value);
    }, time);
  });

export const initPost = createAsyncThunk('post/init', async (thunkAPI) => {
  try {
    const response = await axios.get(`/posts?lastId=0`);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const loadPost = createAsyncThunk(
  'post/loadPost',
  async (lastId, thunkAPI) => {
    try {
      console.log(lastId);
      const response = await axios.get(`/posts?lastId=${lastId || 0}`);
      return delay(1000, response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const addPost = createAsyncThunk(
  'post/addPost',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post('/post', data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const loadDetail = createAsyncThunk(
  'post/loadDetail',
  async (postId, thunkAPI) => {
    try {
      console.log(postId);
      const response = await axios.get(`/post/detail?postId=${postId}`);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const loadComment = createAsyncThunk(
  'post/loadComment',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/post/comment?postId=${id}`);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const addComment = createAsyncThunk(
  'post/addComment',
  async ({ content, postId }, thunkAPI) => {
    console.log(content, postId);
    try {
      const response = await axios.post(`/post/${postId}/comment`, {
        content,
        postId,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const removePost = createAsyncThunk(
  'post/removePost',
  async (postId, thunkAPI) => {
    try {
      const response = await axios.delete(`/post/${postId}`);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const uploadImages = createAsyncThunk(
  'post/uploadImages',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post('/post/images', data);
      console.log(response.data);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const imageRemove = createAsyncThunk(
  'post/imageRemove',
  async (data, thunkAPI) => {
    try {
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const openPostModal = createAsyncThunk(
  'post/openPostModal',
  async (data, thunkAPI) => {
    try {
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);


export const search = createAsyncThunk(
  'post/search',
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(`/posts/search?keyword=${data}`);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);


export const likePost = createAsyncThunk(
  'post/likePost',
  async (data, thunkAPI) => {
    try {
      const response = await axios.patch(`/post/${data}/like`);
      console.log(response)
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const unLikePost = createAsyncThunk(
  'post/unLikePost',
  async (data, thunkAPI) => {
    try {
      const response = await axios.delete(`/post/${data}/like`);
      console.log(response)
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);
