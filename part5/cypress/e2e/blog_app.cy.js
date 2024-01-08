describe('Blog app', function () {
	const newUser = {
		name: 'isah abba',
		username: 'isah',
		password: 'password',
	};
	const blogTest = {
		title: 'test blog',
		author: 'test author',
		url: 'test url',
	};
	beforeEach(function () {
		cy.request('POST', 'http://localhost:3001/api/testing/reset');
		cy.register({
			name: newUser.name,
			username: newUser.username,
			password: newUser.password,
		});
	});

	it('Login form is shown', function () {
		cy.contains('log in to application');
	});

	describe('Login', function () {
		it('succeeds with correct credentials', function () {
			cy.login({
				username: newUser.username,
				password: newUser.password,
			});

			cy.contains(`${newUser.name} logged in`);
		});

		it('fails with wrong credentails', function () {
			cy.get('#username').type(newUser.username);
			cy.get('#password').type('wrong');
			cy.get('#loginBtn').click();

			cy.get('.error')
				.contains('ERROR')
				.should('have.css', 'color', 'rgb(255, 0, 0)');
		});
	});

	describe('when logged in', function () {
		beforeEach(function () {
			cy.login({
				username: newUser.username,
				password: newUser.password,
			});
		});

		it('should render the new blog form and create a new blog', function () {
			cy.contains('new blog').click();
			cy.newblog({
				title: blogTest.title,
				author: blogTest.author,
				url: blogTest.url,
			});

			cy.request('GET', 'http://localhost:3001/api/blogs').then((response) => {
				const data = response.body;
				expect(data).to.have.length(1);
				expect(data[0]).to.have.property('title', blogTest.title);
				expect(data[0]).to.have.property('url', blogTest.url);
				expect(data[0].author).contains(blogTest.author);
			});
		});

		it('user can like a blog', function () {
			cy.contains('new blog').click();
			cy.newblog({
				title: blogTest.title,
				author: blogTest.author,
				url: blogTest.url,
			});

			cy.get('.show-more').click();
			cy.get('.extra-info').find('button.like').as('likeButton');
			cy.get('@likeButton').click();
			cy.get('@likeButton').click();

			cy.request('GET', 'http://localhost:3001/api/blogs').then((response) => {
				const data = response.body;
				expect(data[0].likes).to.equal(2);
			});
		});

		it('a user can delete his post and other user cannot see post', function () {
			cy.contains('new blog').click();
			cy.newblog({
				title: blogTest.title,
				author: blogTest.author,
				url: blogTest.url,
			});

			cy.get('.show-more').click();
			cy.get('.extra-info').find('button.remove').as('removeButton');
			cy.get('@removeButton').click();

			cy.request('GET', 'http://localhost:3001/api/blogs').then((response) => {
				const data = response.body;
				expect(data).to.have.length(0);
			});

			cy.contains('Logout').click();
			cy.register({
				name: 'test user',
				username: 'test',
				password: 'tester',
			});

			cy.request('POST', 'http://localhost:3001/api/login', {
				username: 'test',
				password: 'tester',
			}).then(({ body }) => {
				localStorage.setItem('userInfo', JSON.stringify(body));
				cy.visit('http://localhost:5173');
			});
			cy.createBlog({
				title: 'blog with 6 likes',
				author: blogTest.author,
				url: blogTest.url,
				likes: 6,
			});
			cy.get('.show-more').click();
			cy.get('.extra-info').should('not.have.class', 'remove');
		});
	});
	describe('order of arrangement of blogs', function () {
		beforeEach(function () {
			cy.request('POST', 'http://localhost:3001/api/login', {
				username: newUser.username,
				password: newUser.password,
			}).then(({ body }) => {
				localStorage.setItem('userInfo', JSON.stringify(body));
				cy.visit('http://localhost:5173');
			});
		});
		it('it can create blog and check arrangement in other of likes', function () {
			cy.createBlog({
				title: blogTest.title,
				author: blogTest.author,
				url: blogTest.url,
			});
			cy.createBlog({
				title: 'blog with 11 likes',
				author: blogTest.author,
				url: blogTest.url,
				likes: 11,
			});
			cy.createBlog({
				title: 'blog with 5 likes',
				author: blogTest.author,
				url: blogTest.url,
				likes: 5,
			});
			cy.createBlog({
				title: 'blog with 6 likes',
				author: blogTest.author,
				url: blogTest.url,
				likes: 6,
			});

			cy.request('GET', 'http://localhost:3001/api/blogs').then((response) => {
				const data = response.body;
				expect(data).to.have.length(4);
			});
		});
	});
});
