import { createSlice } from "@reduxjs/toolkit";

const currentPosts = {
    posts: null,
}

const postSlice = createSlice({
    name: "posts",
    initialState: currentPosts,
    reducers: {
        addPost: (state, action) => {
            state.posts = action.payload;
        },
    }
})

export const { addPost } = postSlice.actions;

export default postSlice.reducer;