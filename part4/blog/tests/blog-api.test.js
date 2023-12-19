const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');
const Blog = require('../models/Blog');
const helper = require('./test-helper');

const api = supertest(app);

beforeEach(async () => {
	await Blog.deleteMany({});
	await Blog.insertMany(helper.initialBlogs);
});

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

	test('blog without likes is added with 0 likes', async () => {
		const newBlogZeroLikes = {
			author: 'Robert C. Martin',
			title: 'Type wars',
			url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		};

		await api
			.post('/api/blogs')
			// .set('Authorization', `bearer ${token}`)
			.send(newBlogZeroLikes)
			.expect(201);

		const blogsInDb = await helper.blogsInDb();
		expect(blogsInDb).toHaveLength(helper.initialBlogs.length + 1);

		const likes = blogsInDb.map((blog) => blog.likes);
		expect(likes).toContain(0);
	});

	test('blog without title is not added', async () => {
		const newBlogEmptyTitle = {
			author: 'Robert C. Martin',
			url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		};

		await api
			.post('/api/blogs')
			// .set('Authorization', `bearer ${token}`)
			.send(newBlogEmptyTitle)
			.expect(400);

		const blogsInDb = await helper.blogsInDb();
		expect(blogsInDb).toHaveLength(helper.initialBlogs.length);
	});

	test('blog without url is not added', async () => {
		const newBlogEmptyUrl = {
			author: 'Robert C. Martin',
			title: 'Type wars',
		};

		await api
			.post('/api/blogs')
			// .set('Authorization', `bearer ${token}`)
			.send(newBlogEmptyUrl)
			.expect(400);

		const blogsInDb = await helper.blogsInDb();
		expect(blogsInDb).toHaveLength(helper.initialBlogs.length);
	});
});

afterAll(async () => {
	await mongoose.connection.close();
});
