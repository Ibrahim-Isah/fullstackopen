const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');
const helper = require('./test-helper');

const api = supertest(app);

describe('blogs post and render all works', () => {
	test('blogs are returned', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/);
	});

	test('blogs should have id defined', async () => {
		const blogs = await helper.blogsInDb();

		blogs.forEach((blog) => {
			expect(blog.id).toBeDefined();
		});
	});

	test('can add a valid blog post and length increases', async () => {
		const newBlog = {
			title: 'Javascript will make me rich',
			author: 'Isah Abba Ibrahim',
			url: 'https://techarewa.org/',
			likes: 100,
		};

		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const blogsNow = await helper.blogsInDb();
		expect(blogsNow).toHaveLength(helper.initialBlogs.length + 1);
	});
});

afterAll(async () => {
	await mongoose.connection.close();
});
