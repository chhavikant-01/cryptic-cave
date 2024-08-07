import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    updatePostLikes(state, action) {
      const {postId, userId, offset} = action.payload;
      const post = state.posts.find(post => post._id === postId);
      if(post){
        if(offset === 1){
          post.likes.push(userId);
        }
        if(offset === -1){
          post.likes = post.likes.filter(id => id !== userId);
        }
      }
    },
    deletePost(state, action) {
      const postId = action.payload;
      state.posts = state.posts.filter(post => post._id !== postId);
    },
    addPost(state, action) {
      state.posts.unshift(action.payload);
    },
    anonymizePost(state, action){
      const {postId, author} = action.payload;
      const post = state.posts.find(post => post._id === postId);
      if(post){
        post.isAnonymous = true;
        post.author = author;
      }
    },
    updatePosts(state, action) {
      state.posts = action.payload;
    }
  },
});

export const { setPosts, 
  setStatus, 
  setError, 
  updatePostLikes,
  deletePost,
  addPost,
  anonymizePost, updatePosts } = postsSlice.actions;

export default postsSlice.reducer;
