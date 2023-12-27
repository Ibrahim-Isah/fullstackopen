import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import login from './services/login';
import Notification from './components/Notification';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState(null);

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));

		if (userInfo) {
			setUser(userInfo);
		}
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage(null);

		try {
			const response = await login.loginService({
				username: username,
				password: password,
			});

			setUser(response);
			localStorage.setItem('userInfo', JSON.stringify(response));
			blogService.setToken(response.token);
		} catch (error) {
			console.error(error);
			setMessage('ERROR: Login Failed');
		}
	};

	const blogList = () => {
		return (
			<div>
				<h2>blogs</h2>
				<p>
					{user.name} is logged In.{' '}
					<button
						onClick={() => {
							localStorage.removeItem('userInfo');
							setUser(null);
						}}
					>
						logout
					</button>
				</p>
				<Notification message={message} />
				{blogs.map((blog) => (
					<Blog key={blog.id} blog={blog} />
				))}
			</div>
		);
	};

	const blogForm = () => {
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

	return <div>{user ? blogList() : blogForm()}</div>;
};

export default App;
