import React from 'react';
import Notification from './Notification';

const Login = ({
	message,
	handleSubmit,
	username,
	setUsername,
	password,
	setPassword,
}) => {
	return (
		<div>
			<h2>log in to application</h2>
			<Notification message={message} />
			<form
				onSubmit={handleSubmit}
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

export default Login;
