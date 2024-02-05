import { createSlice } from '@reduxjs/toolkit';

const blogSlice = createSlice({
	name: 'blogs',
	initialState: [],
	reducers: {
		initializeBlogs: (state, action) => {
			return action.payload;
		},
		addBlog: (state, action) => {
			return state.push(action.payload);
		},
	},
});

export const { initializeBlogs, addBlog } = blogSlice.actions;
export default blogSlice.reducer;

export const setBlogs = (blogs) => {
	return async (dispatch) => {
		dispatch(initializeBlogs(blogs));
	};
};
