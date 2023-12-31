import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/login';

const loginService = async (object) => {
	const response = await axios.post(baseUrl, object);

	return response.data;
};

export default {
	loginService,
};
