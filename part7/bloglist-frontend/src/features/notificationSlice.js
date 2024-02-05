import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
	name: 'notification',
	initialState: null,
	reducers: {
		setMessage: (state, action) => {
			return action.payload;
		},
		removeMessage: () => {
			return null;
		},
	},
});

export const { setMessage, removeMessage } = notificationSlice.actions;
export default notificationSlice.reducer;

export const setNotification = (message, time = 5) => {
	return async (dispatch) => {
		dispatch(setMessage(message));
		setTimeout(() => {
			dispatch(removeMessage());
		}, time * 1000);
	};
};
