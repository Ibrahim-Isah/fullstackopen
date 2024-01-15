/* eslint-disable react/prop-types */
import { useReducer, createContext } from 'react';

const notificationReducer = (state, action) => {
	switch (action.type) {
		case 'SHOW':
			return action.payload;
		case 'CLEAR':
			return null;
		default:
			return state;
	}
};

const NotifyContext = createContext();

export const NotifyContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(notificationReducer, '');

	return (
		<NotifyContext.Provider value={[state, dispatch]}>
			{children}
		</NotifyContext.Provider>
	);
};

export default NotifyContext;
