import React, { useState } from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ handleSubmit }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const onHandleLogin = (event) => {
		event.preventDefault();
		handleSubmit(username, password);
		setUsername('');
		setPassword('');
	};

	return (
		<div>
			<h2>log in to application</h2>
			<form
				onSubmit={onHandleLogin}
				style={{
					display: 'flex',
					flexDirection: 'column',
					width: '200px',
				}}
			>
				<div>
					username:
					<input
						name='username'
						type='text'
						placeholder='username'
						value={username}
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div>
					password:
					<input
						name='password'
						type='password'
						placeholder='password'
						value={password}
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type='submit'>Login</button>
			</form>
		</div>
	);
};

export default LoginForm;

LoginForm.propTypes = {
	handleSubmit: PropTypes.func.isRequired,
};
