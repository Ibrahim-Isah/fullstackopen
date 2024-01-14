import axios from 'axios';

const baseUrl = 'http://localhost:5000/anecdotes';

const getAll = async () => {
	const response = await axios.get(baseUrl);
	return response.data;
};

const createNew = async (content) => {
	const object = { content, important: false };
	const response = await axios.post(baseUrl, object);
	return response.data;
};

const voteAdd = async (id) => {
	const { data: currentAnecdote } = await axios.get(`${baseUrl}/${id}`);
	const response = await axios.patch(`${baseUrl}/${id}`, {
		votes: currentAnecdote.votes + 1,
	});
	return response.data;
};

export default {
	getAll,
	createNew,
	voteAdd,
};
