import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './features/notificationSlice';
import blogReducer from './features/blogSlice';
import authReducer from './features/authSlice';
import usersReducer from './features/usersSlice';

export const store = configureStore({
	reducer: {
		notification: notificationReducer,
		blogs: blogReducer,
		auth: authReducer,
		users: usersReducer,
	},
});
