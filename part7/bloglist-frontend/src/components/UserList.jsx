import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const User = ({ user }) => {
	return (
		<tr>
			<td>
				<Link to={`/users/${user.id}`}>{user.name}</Link>
			</td>
			<td>{user.blogs.length}</td>
		</tr>
	);
};

const UserList = () => {
	const users = useSelector((state) => state.users);
	return (
		<Table hover bordered>
			<thead>
				<tr>
					<th>Name</th>
					<th>Blogs</th>
				</tr>
			</thead>
			<tbody>
				{users.map((user) => (
					<User key={user.id} user={user} />
				))}
			</tbody>
		</Table>
	);
};

export default UserList;
