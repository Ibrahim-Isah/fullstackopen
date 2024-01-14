import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		addNotification(state, action) {
			return action.payload || 'testing';
		},
		clearNotification() {
			return '';
		},
	},
});

export const { addNotification, clearNotification } = notificationSlice.actions;

export const showNotification = (text, time) => {
	return (dispatch) => {
		dispatch(addNotification(text));
		setTimeout(() => {
			clearNotification();
		}, time);
	};
};
export default notificationSlice.reducer;
