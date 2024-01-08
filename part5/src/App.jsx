import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import login from './services/login';
import Notification from './components/Notification';
import LoginForm from './components/Login';
import Toggable from './components/Toggable';
import BlogForm from './components/BlogForm';

const App = () => {
	const [blogs, setBlogs] = useState([]);
	const [user, setUser] = useState(null);

	const [message, setMessage] = useState(null);

	const newBlogRef = useRef();

	useEffect(() => {
		blogService.getAll().then((blogs) => setBlogs(blogs));
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));

		if (userInfo) {
			setUser(userInfo);
			blogService.setToken(userInfo.token);
		}
	}, []);

	const handleSubmit = async (username, password) => {
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

	const addNewBlog = async (title, url, author) => {
		const payload = {
			url,
			author,
			title,
		};

		try {
			const response = await blogService.create(payload);

			if (response) {
				setMessage('New blog added successfully');
				const user = blogService.getUserInfo();
				setBlogs(blogs.concat(response));
			}
		} catch (error) {
			console.error(error);
			setMessage('ERROR: Failed to create new blog');
		}
	};

	const handleLogout = () => {
		window.localStorage.removeItem('userInfo');
		setUser(null);
	};

	const updateBlog = async (blog) => {
		try {
			await blogService.update(blog.id, {
				title: blog.title,
				author: blog.author,
				url: blog.url,
				likes: blog.likes,
			});
			setMessage(`new like to blog ${blog.title} by ${blog.author} added`);
			const newBlogs = blogs.map((currentBlog) =>
				currentBlog.id === blog.id
					? { ...currentBlog, likes: currentBlog.likes + 1 }
					: currentBlog
			);
			setBlogs(newBlogs);
		} catch (error) {
			setMessage(
				`ERROR: a new like to blog ${blog.title} by ${blog.author} NOT added`
			);
		}
	};

	const deleteBlog = async (blog) => {
		try {
			await blogService.deleteBlog(blog.id);
			setMessage(`blog ${blog.title} by ${blog.author} delete`);
			const newBlogs = blogs.filter(
				(currentBlog) => currentBlog.id !== blog.id
			);
			setBlogs(newBlogs);
		} catch (error) {
			setMessage(`ERROR: blog ${blog.title} by ${blog.author} NOT deleted`);
		}
	};

	return (
		<div>
			<h2>blogs</h2>
			<Notification message={message} />
			{user === null ? (
				<LoginForm handleSubmit={handleSubmit} />
			) : (
				<>
					<p>
						{user.name} logged in <button onClick={handleLogout}>Logout</button>
					</p>

					<Toggable buttonLabel='new blog' ref={newBlogRef}>
						<h2>create new</h2>
						<BlogForm addNewBlog={addNewBlog} />
					</Toggable>
					<hr></hr>
					<div>
						{blogs
							.sort((a, b) => b.likes - a.likes)
							.map((blog) => (
								<Blog
									key={blog.id}
									blog={blog}
									updateBlog={updateBlog}
									deleteBlog={deleteBlog}
								/>
							))}
					</div>
				</>
			)}
		</div>
	);
};

export default App;
