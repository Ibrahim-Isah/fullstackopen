const blogsRouter = require('express').Router();
const Blog = require('../models/Blog');

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({});

	response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
	const blog = new Blog(request.body);

	if (!blog.likes) {
		blog.likes = 0;
	}

	if (!blog.url || !blog.title) {
		return response.status(400).json({ error: 'title or url missing' });
	}

	const savedBlog = await blog.save();

	response.status(201).json(savedBlog);
});

blogsRouter.put('/:id', async (request, response) => {
	const updatedBlog = {
		...request.body,
	};

	const updated = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {
		new: true,
	});

	response.status(200).json(updated);
});

blogsRouter.delete('/:id', async (request, response) => {
	const blogExist = await Blog.findById(request.params.id);
	if (blogExist) {
		await Blog.findByIdAndDelete(request.params.id);
	}

	response.status(204).send({ success: true });
});

module.exports = blogsRouter;
