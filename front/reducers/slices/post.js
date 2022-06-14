import { createSlice } from '@reduxjs/toolkit';
import {
  loadPost,
  addPost,
  loadDetail,
  loadComment,
  addComment,
  initPost,
  removePost,
  uploadImages,
  imageRemove,
  search,
  likePost,
  unLikePost
} from '../actions/post';
import _find from 'lodash/find';
import _remove from 'lodash/remove';

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    initPostLoading: false,
    initPostDone: false,
    initPostError: null,

    loadLoading: false,
    loadDone: false,
    loadError: null,

    addloading: false,
    addDone: false,
    addError: null,

    addloading: false,
    addDone: false,
    addError: null,

    imagesLoading: false,
    imagesDone: false,
    imagesError: null,

    removeImageLoading: false,
    removeImageDone: false,
    removeImageError: null,

    detailloading: false,
    detailDone: false,
    detailError: null,

    commentLoading: false,
    commentDone: false,
    commentError: null,

    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,

    searchLoading: false,
    searchDone: false,
    searchError: null,

    likeLoading: false,
    likeDone: false,
    likeError: null,

    unLikeLoading: false,
    unLikeDone: false,
    unLikeError: null,

    mainPosts: [],
    postLikes: [],
    detail: null,
    comments: [],
    hasMorePosts: true,
    imagePaths: [],
    openPostFrom: false,
  },
  reducers: {
    openPostState: (state) => {
      state.openPostFrom = true;
    },
    closePostState: (state) => {
      state.openPostFrom = false;
    },
    clearPostState: (state) => {
      state.loadLoading = false;
      state.loadDone = false;
      state.loadError = null;
      state.hasMorePosts = true;
      return state;
    },
    clearPostRemove: (state) => {
      state.removePostloading = false;
      state.removePostDone = false;
      state.removePostError = null;
      return state;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(initPost.pending, (state, action) => {
        state.initPostLoading = true;
        state.initPostDone = false;
        state.initPostError = null;
      })
      .addCase(initPost.fulfilled, (state, action) => {
        state.initPostLoading = false;
        state.initPostDone = true;
        state.mainPosts = action.payload.data;
      })
      .addCase(initPost.rejected, (state, action) => {
        state.initPostLoading = false;
        state.initPostDone = false;
        state.initPostError = action.payload;
      })
      .addCase(loadPost.pending, (state, action) => {
        state.loadLoading = true;
        state.loadDone = false;
        state.loadError = null;
      })
      .addCase(loadPost.fulfilled, (state, action) => {
        state.loadLoading = false;
        state.loadDone = true;
        state.mainPosts = state.mainPosts.concat(action.payload.data);
        state.hasMorePosts = action.payload.data.length === 10;
      })
      .addCase(loadPost.rejected, (state, action) => {
        state.loadLoading = false;
        state.loadDone = false;
        state.loadError = action.payload;
      })
      .addCase(addPost.pending, (state, action) => {
        state.addloading = true;
        state.addDone = false;
        state.addError = null;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.addloading = false;
        state.addDone = true;
        state.mainPosts.unshift(action.payload.data);
        state.imagePaths = [];
      })
      .addCase(addPost.rejected, (state, action) => {
        state.addloading = false;
        state.addDone = false;
        state.addError = action.payload;
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
      .addCase(removePost.pending, (state, action) => {
        state.removePostloading = true;
        state.removePostDone = false;
        state.removePostError = null;
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.removePostloading = false;
        state.removePostDone = true;
        state.mainPosts = state.mainPosts.filter(
          (post) => post.id === action.payload.PostId,
        );
      })
      .addCase(removePost.rejected, (state, action) => {
        state.removePostloading = false;
        state.removePostDone = false;
        state.removePostError = action.payload;
      })
      .addCase(loadDetail.pending, (state, action) => {
        state.detailloading = true;
        state.detailDone = false;
        state.detailError = null;
      })
      .addCase(loadDetail.fulfilled, (state, action) => {
        state.detailloading = false;
        state.detailDone = true;
        state.detail = action.payload.data;
      })
      .addCase(loadDetail.rejected, (state, action) => {
        state.detailloading = false;
        state.detailDone = false;
        state.detailError = action.payload;
      })
      .addCase(loadComment.pending, (state, action) => {
        state.commentLoading = true;
        state.commentDone = false;
        state.commentError = null;
      })
      .addCase(loadComment.fulfilled, (state, action) => {
        state.commentLoading = false;
        state.commentDone = true;
        state.comments = action.payload.data;
      })
      .addCase(loadComment.rejected, (state, action) => {
        state.commentLoading = false;
        state.commentDone = false;
        state.commentError = action.payload;
      })

      .addCase(addComment.pending, (state, action) => {
        state.addCommentLoading = true;
        state.addCommentDone = false;
        state.addCommentError = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.addCommentLoading = false;
        state.addCommentDone = true;
        state.comments.push(action.payload.data);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.addCommentLoading = false;
        state.addCommentDone = false;
        state.addCommentError = action.payload;
      })

      .addCase(search.pending, (state, action) => {
        state.searchLoading = true;
        state.searchDone = false;
        state.searchError = null;
      })
      .addCase(search.fulfilled, (state, action) => {
        state.searchLoading = false;
        state.searchDone = true;
        state.mainPosts = action.payload.data;
      })
      .addCase(search.rejected, (state, action) => {
        state.searchLoading = false;
        state.searchDone = false;
        state.searchError = action.payload;
      })
      .addCase(likePost.pending, (state, action) => {
        state.likeLoading = true;
        state.likeDone = false;
        state.likeError = null;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.likeLoading = false;
        state.likeDone = true;
      })
      .addCase(likePost.rejected, (state, action) => {
        state.likeLoading = false;
        state.likeDone = false;
        state.likeError = action.payload;
      })
      .addCase(unLikePost.pending, (state, action) => {
        state.unLikeLoading = true;
        state.unLikeDone = false;
        state.unLikeError = null;
      })
      .addCase(unLikePost.fulfilled, (state, action) => {
        state.unLikeLoading = false;
        state.unLikeDone = true;
      })
      .addCase(unLikePost.rejected, (state, action) => {
        state.unLikeLoading = false;
        state.unLikeDone = false;
        state.unLikeError = action.payload;
      })
});

/*
  likePost,
  unLikePost
*/

export const { clearPostState, clearPostRemove, openPostState, closePostState } = postSlice.actions;
export const postsSelector = (state) => state.post;
