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

		// it('user can like a blog', function () {});
	});
});
