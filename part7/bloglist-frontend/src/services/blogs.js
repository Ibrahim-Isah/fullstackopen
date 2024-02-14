import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
const baseUrl = 'http://localhost:3001/api/blogs';

let token = null;

const setToken = (t) => {
	return (token = `Bearer ${t}`);
};

const getUserInfo = () => {
	return token ? jwtDecode(token) : false;
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

const update = (id, newObject) => {
	const user = getUserInfo();

	const request = axios.put(`${baseUrl}/${id}`, {
		...newObject,
		user: user.id,
	});
	return request.then((response) => response.data);
};

const deleteBlog = (id) => {
	const config = {
		headers: { Authorization: token },
	};
	const request = axios.delete(`${baseUrl}/${id}`, config);
	return request.then((response) => response.data);
};

export default { getAll, create, setToken, getUserInfo, update, deleteBlog };
