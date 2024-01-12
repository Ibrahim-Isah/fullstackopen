const reducer = (state = '', action) => {
	switch (action.type) {
		case 'FILTER':
			return action.payload;
		default:
			return state;
	}
};

export const addFilter = (filter) => {
	return {
		type: 'FILTER',
		payload: filter,
	};
};

export default reducer;
