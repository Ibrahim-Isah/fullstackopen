import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import LoginForm from './components/Login';
import Notification from './components/Notification';
import Toggable from './components/Toggable';
import { initUser, loginUser, logoutUser } from './features/authSlice';
import {
	addBlog,
	addLike,
	initializeBlogs,
	removeBlog,
} from './features/blogSlice';
import { setNotification } from './features/notificationSlice';
import blogService from './services/blogs';
import userService from './services/users';
import login from './services/login';
import UserList from './components/UserList';
import { initUsers } from './features/usersSlice';
import Header from './components/Header';

const App = () => {
	const dispatch = useDispatch();
	const blogs = useSelector((state) => state.blogs);
	const user = useSelector((state) => state.auth);
	const users = useSelector((state) => state.users);

	const newBlogRef = useRef();

	useEffect(() => {
		blogService.getAll().then((blogs) => dispatch(initializeBlogs(blogs)));
		userService.getAll().then((users) => dispatch(initUsers(users)));
		const userInfo = JSON.parse(localStorage.getItem('userInfo'));

		if (userInfo) {
			blogService.setToken(userInfo.token);
			dispatch(initUser(userInfo));
		}
	}, []);

	const handleSubmit = async (username, password) => {
		dispatch(setNotification(null));

		try {
			const response = await login.loginService({
				username: username,
				password: password,
			});

			dispatch(loginUser(response));
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
				dispatch(addBlog(response));
			}
		} catch (error) {
			console.error(error);
			dispatch(setNotification('ERROR: Failed to create new blog'));
		}
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

			dispatch(addLike(blog.id));
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
			dispatch(removeBlog(blog.id));
			dispatch(setNotification(`blog ${blog.title} by ${blog.author} delete`));
		} catch (error) {
			dispatch(
				setNotification(
					`ERROR: blog ${blog.title} by ${blog.author} NOT deleted`
				)
			);
		}
	};

	const router = createBrowserRouter([
		{
			path: '/',
			element: (
				<>
					<Notification />
					<LoginForm handleSubmit={handleSubmit} />
				</>
			),
		},
		{
			path: '/users',
			element: (
				<div>
					{user === null ? (
						<div>
							<Notification />
							<LoginForm />
						</div>
					) : (
						<div>
							<Header />
							<h2>Bloglist</h2>
							<Notification />
							<h2>Users</h2>
							<UserList />
						</div>
					)}
				</div>
			),
		},
		{
			path: '/blogs/:id',
			element: (
				<div>
					<h2>blogs</h2>
					<Notification />
					{user === null ? (
						<LoginForm handleSubmit={handleSubmit} />
					) : (
						<>
							<Header />

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
			),
		},
		{
			path: '/blogs',
			element: (
				<div>
					<h2>blogs</h2>
					<Notification />
					{user === null ? (
						<LoginForm handleSubmit={handleSubmit} />
					) : (
						<>
							<Header />

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
			),
		},
	]);

	return <RouterProvider router={router} />;
};

export default App;
