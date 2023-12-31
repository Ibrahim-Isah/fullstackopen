import React, { useState } from 'react';

const BlogForm = ({ addNewBlog }) => {
	const [title, setTitle] = useState('');
	const [url, setUrl] = useState('');
	const [author, setAuthor] = useState('');

	const onHandleNewBlog = (e) => {
		e.preventDefault();

		addNewBlog(title, url, author);
		setTitle('');
		setAuthor('');
		setUrl('');
	};
	return (
		<div>
			<h2>create new blog</h2>

			<form onSubmit={onHandleNewBlog}>
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

export default BlogForm;
