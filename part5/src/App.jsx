import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import login from './services/login';
import Notification from './components/Notification';
import Login from './components/Login';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState(null);
	const [title, setTitle] = useState('');
	const [url, setUrl] = useState('');
	const [author, setAuthor] = useState('');

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));

		if (userInfo) {
			setUser(userInfo);
			blogService.setToken(userInfo.token);
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

	const addNewBlog = async (e) => {
		e.preventDefault();

		const payload = {
			url,
			author,
			title,
		};

		try {
			const response = await blogService.create(payload);

			if (response) {
				console.log(response);
				setMessage('New blog added successfully');
			}
		} catch (error) {
			console.error(error);
			setMessage('ERROR: Failed to create new blog');
		}
	};

	const newBlogForm = () => {
		return (
			<div>
				<h2>create new blog</h2>
				<form onSubmit={addNewBlog}>
					<div>
						title
						<input
							name='title'
							type='text'
							value={title}
							onChange={({ target }) => setTitle(target.value)}
						/>
					</div>
					<div>
						author
						<input
							name='author'
							type='text'
							value={author}
							onChange={({ target }) => setAuthor(target.value)}
						/>
						<div>
							url
							<input
								name='url'
								type='text'
								value={url}
								onChange={({ target }) => setUrl(target.value)}
							/>
						</div>
					</div>
					<button type='submit'>Submit</button>
				</form>
			</div>
		);
	};

	const blogList = () => {
		return (
			<div>
				<h2>blogs</h2>
				{newBlogForm()}
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

	return <div>{user ? blogList() : <Login />}</div>;
};

export default App;
