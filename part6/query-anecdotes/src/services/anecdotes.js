import axios from 'axios';

const getAll = async () => {
	const response = await axios.get('http://localhost:3001/anecdotes');
	return response.data;
};

export { getAll };
