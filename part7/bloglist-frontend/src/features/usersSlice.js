import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
	name: 'users',
	initialState: [],
	reducers: {
		initUsers: (state, action) => {
			return action.payload;
		},
	},
});

export const { initUsers } = usersSlice.actions;
export default usersSlice.reducer;

export const setUsers = (users) => {
	return async (dispatch) => {
		dispatch(initUsers(users));
	};
};
