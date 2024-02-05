import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import login from './services/login';
import Notification from './components/Notification';
import LoginForm from './components/Login';
import Toggable from './components/Toggable';
import BlogForm from './components/BlogForm';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from './features/notificationSlice';
import { addBlog, initializeBlogs } from './features/blogSlice';

const App = () => {
	const dispatch = useDispatch();
	const blogs = useSelector((state) => state.blogs);

	const [user, setUser] = useState(null);

	const newBlogRef = useRef();

	useEffect(() => {
		blogService.getAll().then((blogs) => dispatch(initializeBlogs(blogs)));
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));

		if (userInfo) {
			setUser(userInfo);
			blogService.setToken(userInfo.token);
		}
	}, []);

	const handleSubmit = async (username, password) => {
		dispatch(setNotification(null));

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
			dispatch(setNotification('ERROR: Login Failed'));
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
				dispatch(setNotification('New blog added successfully'));
				const user = blogService.getUserInfo();
				dispatch(addBlog(response));
			}
		} catch (error) {
			console.error(error);
			dispatch(setNotification('ERROR: Failed to create new blog'));
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
			dispatch(
				setNotification(
					`new like to blog ${blog.title} by ${blog.author} added`
				)
			);
			const newBlogs = blogs.map((currentBlog) =>
				currentBlog.id === blog.id
					? { ...currentBlog, likes: currentBlog.likes + 1 }
					: currentBlog
			);
			dispatch(initializeBlogs(newBlogs));
		} catch (error) {
			dispatch(
				setNotification(
					`ERROR: a new like to blog ${blog.title} by ${blog.author} NOT added`
				)
			);
		}
	};

	const deleteBlog = async (blog) => {
		try {
			await blogService.deleteBlog(blog.id);
			dispatch(setNotification(`blog ${blog.title} by ${blog.author} delete`));
			const newBlogs = blogs.filter(
				(currentBlog) => currentBlog.id !== blog.id
			);
			dispatch(initializeBlogs(newBlogs));
		} catch (error) {
			dispatch(
				setNotification(
					`ERROR: blog ${blog.title} by ${blog.author} NOT deleted`
				)
			);
		}
	};

	return (
		<div>
			<h2>blogs</h2>
			<Notification />
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
					<div className='blog'>
						{blogs
							// .sort((a, b) => b.likes - a.likes)
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
