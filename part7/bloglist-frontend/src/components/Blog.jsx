import { useState } from 'react';
import blogService from '../services/blogs';
import PropTypes from 'prop-types';

const Blog = ({ blog, updateBlog, deleteBlog }) => {
	const [visible, setVisible] = useState(false);

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	const addLike = (e) => {
		e.preventDefault();
		updateBlog({
			...blog,
			likes: blog.likes + 1,
		});
	};

	const blogStyle = {
		paddingTop: 10,
		paddingLeft: 2,
		border: 'solid',
		borderWidth: 1,
		marginBottom: 5,
	};

	const handleRemove = () => {
		if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
			deleteBlog(blog);
	};

	const allowRemove = (blogUserId) => {
		const user = blogService.getUserInfo();
		return blogUserId === user.id;
	};
	return (
		<div style={blogStyle}>
			<div>
				<a href={`/blogs/${blog.id}`} className='title'>
					{blog.title}{' '}
				</a>
			</div>
			{visible && (
				<div className='extra-info'>
					<p>{blog.url}</p>
					<p>
						likes <span className='likes'>{blog.likes}</span>{' '}
						<button className='like' onClick={addLike}>
							like
						</button>
					</p>
					{allowRemove(blog.user) && (
						<button
							className='remove'
							style={{
								backgroundColor: 'blue',
								color: 'white',
								cursor: 'pointer',
							}}
							onClick={handleRemove}
						>
							remove
						</button>
					)}
				</div>
			)}
		</div>
	);
};

export default Blog;
Blog.propTypes = {
	blog: PropTypes.object.isRequired,
	deleteBlog: PropTypes.func.isRequired,
	updateBlog: PropTypes.func.isRequired,
};
