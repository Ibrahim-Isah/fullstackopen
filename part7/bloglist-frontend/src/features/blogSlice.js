import { createSlice } from '@reduxjs/toolkit';

const blogSlice = createSlice({
	name: 'blogs',
	initialState: [],
	reducers: {
		initializeBlogs: (state, action) => {
			return action.payload;
		},
		addBlog: (state, action) => {
			return state.concat(action.payload);
		},
		removeBlog: (state, action) => {
			return state.filter((blog) => blog.id !== action.payload);
		},
		addLike: (state, action) => {
			return state.map((blog) => {
				if (blog.id === action.payload) {
					return {
						...blog,
						likes: blog.likes + 1,
					};
				}
				return blog;
			});
		},
		addComment: (state, action) => {
			return state.map((blog) => {
				if (blog.id === action.payload.id) {
					return {
						...blog,
						comments: blog.comments.concat(action.payload.comment),
					};
				}
				return blog;
			});
		},
	},
});

export const { initializeBlogs, addBlog, removeBlog, addLike, addComment } =
	blogSlice.actions;
export default blogSlice.reducer;

export const setBlogs = (blogs) => {
	return async (dispatch) => {
		dispatch(initializeBlogs(blogs));
	};
};
