import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useMatch } from 'react-router-dom';
import Blog from './components/Blog';
import BlogForm from './components/BlogForm';
import Header from './components/Header';
import LoginForm from './components/Login';
import Notification from './components/Notification';
import Toggable from './components/Toggable';
import UserBlog from './components/UserBlog';
import UserList from './components/UserList';
import { initUser, loginUser } from './features/authSlice';
import {
	addBlog,
	addComment,
	addLike,
	initializeBlogs,
	removeBlog,
} from './features/blogSlice';
import { setNotification } from './features/notificationSlice';
import { initUsers } from './features/usersSlice';
import blogService from './services/blogs';
import login from './services/login';
import userService from './services/users';
import { Button, Table } from 'react-bootstrap';

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

	const handleLike = async (blog) => {
		try {
			await blogService.update(blog.id, {
				title: blog.title,
				author: blog.author,
				url: blog.url,
				likes: blog.likes + 1,
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

	const matchUser = useMatch('/users/:id');
	const singleUser = matchUser
		? users.find((user) => user.id === matchUser.params.id)
		: null;

	const matchBlog = useMatch('/blogs/:id');
	const singleBlog = matchBlog
		? blogs.find((blog) => blog.id === matchBlog.params.id)
		: null;

	const handleComment = async (event, blog) => {
		event.preventDefault();

		try {
			const commentToAdd = event.target.comment.value;
			event.target.comment.value = '';
			await blogService.update(blog.id, {
				title: blog.title,
				author: blog.author,
				url: blog.url,
				likes: blog.likes,
				comments: blog.comments.concat(commentToAdd),
			});
			dispatch(
				setNotification(
					`a new comment to blog ${blog.title} by ${blog.author} added`
				)
			);

			dispatch(
				addComment({
					id: blog.id,
					comment: commentToAdd,
				})
			);
		} catch (error) {
			dispatch(
				setNotification(
					`ERROR: a new comment to blog ${blog.title} by ${blog.author} NOT added`
				)
			);
		}
	};

	return (
		<div className='container'>
			<Routes>
				<Route
					path='/users/:id'
					element={
						<>
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
									<h3>{user.name}</h3>
									<h4>Added blogs</h4>
									{!singleUser ? null : (
										<ul>
											{singleUser.blogs.map((blog) => (
												<UserBlog key={blog.id} blog={blog} />
											))}
										</ul>
									)}
								</div>
							)}
						</>
					}
				/>
				<Route
					path='/blogs/:id'
					element={
						<>
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
									{!singleBlog ? null : (
										<div>
											<h2>{singleBlog.title}</h2>
											<p>{singleBlog.url}</p>
											<p>
												{singleBlog.likes} likes{' '}
												<Button
													variant='primary'
													onClick={() => handleLike(singleBlog)}
												>
													like
												</Button>
											</p>
											<p>added by {singleBlog.author}</p>
											<h3>comments</h3>
											<form onSubmit={(e) => handleComment(e, singleBlog)}>
												<div>
													<input id='comment' type='text' name='comment' />
													<Button
														style={{
															margin: 5,
														}}
														variant='primary'
														id='comment-button'
														type='submit'
													>
														add comment
													</Button>
												</div>
											</form>
											<ul>
												{singleBlog?.comments?.map((comment) => (
													<li key={comment}>{comment}</li>
												))}
											</ul>
										</div>
									)}
								</div>
							)}
						</>
					}
				/>
				<Route
					path='/blogs'
					element={
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
													updateBlog={handleLike}
													deleteBlog={deleteBlog}
												/>
											))}
									</div>
								</>
							)}
						</div>
					}
				/>
				<Route
					path='/users'
					element={
						<>
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
						</>
					}
				/>
				<Route
					path='/'
					element={
						<>
							<Notification />
							<LoginForm />
						</>
					}
				/>
			</Routes>
		</div>
	);
};

export default App;
