import axios from 'axios';

const getAll = async () => {
	const response = await axios.get('http://localhost:3001/anecdotes');
	return response.data;
};

const createNew = async (anecdote) => {
	const response = await axios.post(
		'http://localhost:3001/anecdotes',
		anecdote
	);
	return response.data;
};

const voteById = async (updatedAnecdote) => {
	const response = await axios.put(
		`http://localhost:3001/anecdotes/${updatedAnecdote.id}`,
		updatedAnecdote
	);
	return response.data;
};

export { getAll, createNew, voteById };
