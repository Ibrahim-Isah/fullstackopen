import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'auth',
	initialState: null,
	reducers: {
		initUser: (state, action) => action.payload,
		loginUser: (state, action) => action.payload,
		logoutUser: () => null,
	},
});

export const { initUser, loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
