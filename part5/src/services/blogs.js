import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/blogs';

let token = null;

const setToken = (t) => {
	return (token = `Bearer ${t}`);
};

const create = async (data) => {
	const response = await axios.post(baseUrl, data, {
		headers: {
			Authorization: token,
		},
	});

	return response.data;
};

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((response) => response.data);
};

export default { getAll, create, setToken };
