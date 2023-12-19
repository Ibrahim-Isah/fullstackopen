const mongoose = require('mongoose');
const app = require('../app');
const supertest = require('supertest');
const Blog = require('../models/Blog');
const helper = require('./test-helper');

const api = supertest(app);

beforeEach(async () => {
	await Blog.deleteMany({});
	await User.deleteMany({});
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

describe('change blogs on database', () => {
	test('deleting a single blog post resource', async () => {
		const blogsInDb = await helper.blogsInDb();
		const someBlog = blogsInDb[0];

		await api
			.delete(`/api/blogs/${someBlog.id}`)
			// .set('Authorization', `bearer ${token}`)
			.expect(204);

		const updateBlogsInDb = await helper.blogsInDb();
		expect(updateBlogsInDb).toHaveLength(helper.initialBlogs.length - 1);
	});

	test('add one like to a blog', async () => {
		const blogsInDb = await helper.blogsInDb();
		const someBlog = blogsInDb[0];
		const beforeLikes = someBlog.likes;
		someBlog.likes = beforeLikes + 1;

		await api.put(`/api/blogs/${someBlog.id}`).send(someBlog).expect(200);

		const updateBlogsInDb = await helper.blogsInDb();
		const someBlogUpdated = updateBlogsInDb[0];

		expect(someBlogUpdated.likes).toBe(beforeLikes + 1);
	});

	test('change title of some blog', async () => {
		const blogsInDb = await helper.blogsInDb();
		const someBlog = blogsInDb[0];
		someBlog.title = 'New Awesome Title';

		await api.put(`/api/blogs/${someBlog.id}`).send(someBlog).expect(200);

		const updateBlogsInDb = await helper.blogsInDb();
		const someBlogUpdated = updateBlogsInDb[0];

		expect(someBlogUpdated.title).toBe('New Awesome Title');
	});

	test('not update wrong blog id', async () => {
		const blogsInDb = await helper.blogsInDb();
		const someBlog = blogsInDb[0];
		const randomWrongId = '2384rhjfnw23';

		await api.put(`/api/blogs/${randomWrongId}`).send(someBlog).expect(404);
	});
});

describe('user communication with database', () => {
	test('should return error if username or password is missing', async () => {
		const newUser = {
			username: '',
			password: 'password',
			name: 'jane doe',
		};

		await api.post('/api/users').send(newUser).expect(404);
	});

	test('should return error if username or password length is less than 3', async () => {
		const newUser = {
			username: 'jane',
			password: 'pa',
			name: 'jane doe',
		};

		await api.post('/api/users').send(newUser).expect(404);
	});
});

afterAll(async () => {
	await mongoose.connection.close();
});
