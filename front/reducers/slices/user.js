import { createSlice } from '@reduxjs/toolkit';
import { login, loginout, register, userInfo, uploadImages, imageRemove } from '../actions/auth';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userLoading: false,
    userDone: false,
    userError: null,

    loginLoading: false,
    loginDone: false,
    loginError: null,

    logoutLoading: false,
    logoutDone: false,
    logoutError: null,

    imagesLoading: false,
    imagesDone: false,
    imagesError: null,

    removeImageLoading: false,
    removeImageDone: false,
    removeImageError: null,

    signupLoading: false,
    signupDone: false,
    signupError: null,
    isLogin: false,

    initState: true,
    imagePaths: [],
    user: null,
  },
  reducers: {
    clearLoginState: (state) => {
      state.loginLoading = false;
      state.loginDone = false;
      state.loginError = null;
      state.user = null;
      return state;
    },
    clearUserState: (state) => {
      state.userLoading = false;
      state.userDone = false;
      state.userError = null;
      state.user = null;
      return state;
    },
    clearSignupState: (state) => {
      state.signupLoading = false;
      state.signupDone = false;
      state.signupError = null;
      return state;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(userInfo.pending, (state, action) => {
        state.userLoading = true;
        state.userDone = false;
        state.userError = null;
      })
      .addCase(userInfo.fulfilled, (state, action) => {
        state.userLoading = false;
        state.userDone = true;
        state.user = action.payload;
      })
      .addCase(userInfo.rejected, (state, action) => {
        state.userLoading = false;
        state.userDone = false;
        state.userError = action.payload;
      })
      .addCase(login.pending, (state, action) => {
        state.loginLoading = true;
        state.loginDone = false;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginLoading = false;
        state.loginDone = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action.payload);
        state.loginLoading = false;
        state.loginDone = false;
        state.loginError = action.payload.response.data;
      })
      .addCase(loginout.pending, (state, action) => {
        state.logoutLoading = true;
        state.logoutDone = false;
        state.logoutError = null;
      })
      .addCase(loginout.fulfilled, (state, action) => {
        console.log(action.payload);
        state.logoutLoading = false;
        state.logoutDone = true;
        state.user = null;
      })
      .addCase(loginout.rejected, (state, action) => {
        state.logoutLoading = false;
        state.logoutDone = false;
        state.logoutError = action.payload;
      })
      .addCase(uploadImages.pending, (state, action) => {
        state.imagesLoading = true;
        state.imagesDone = false;
        state.imagesError = null;
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        state.imagesLoading = false;
        state.imagesDone = true;
        state.imagePaths = action.payload.data;
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.imagesLoading = false;
        state.imagesDone = false;
        state.imagesError = action.payload;
      })
      .addCase(imageRemove.pending, (state, action) => {
        state.removeImageLoading = true;
        state.removeImageDone = false;
        state.removeImageError = null;
      })
      .addCase(imageRemove.fulfilled, (state, action) => {
        state.removeImageLoading = false;
        state.removeImageDone = true;
        state.imagePaths = state.imagePaths.filter(
          (img, index) => index !== action.payload,
        );
      })
      .addCase(imageRemove.rejected, (state, action) => {
        state.removeImageLoading = false;
        state.removeImageDone = false;
        state.removeImageError = action.payload;
      })
      .addCase(register.pending, (state, action) => {
        state.signupLoading = true;
        state.signupDone = false;
        state.signupError = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.signupLoading = false;
        state.signupDone = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.signupLoading = true;
        state.signupDone = false;
        state.signupError = action.payload;
      }),
});

export const { clearLoginState, clearSignupState, clearUserState } =
  userSlice.actions;
export const userSelector = (state) => state.user;
