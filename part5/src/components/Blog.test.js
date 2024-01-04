import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Blog from './Blog';

describe('<Blog />', () => {
	let component;

	const blog = {
		id: 'testing123',
		title: 'title',
		author: 'author',
		url: 'url',
		user: {
			id: 'user123',
		},
		likes: 0,
	};

	const updateBlog = jest.fn();
	const deleteBlog = jest.fn();

	beforeEach(() => {
		component = render(
			<Blog blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog} />
		);
	});

	test('check if blogs title and author are displayed but not url and likes', () => {
		const title = component.container.querySelector('.title');
		expect(title).toHaveTextContent(blog.title);
		const author = component.container.querySelector('.author');
		expect(author).toHaveTextContent(blog.author);
		expect(component.queryByText(blog.url)).not.toBeInTheDocument();
		expect(component.queryByText('like')).not.toBeInTheDocument();
	});

	test('show url and likes when view button is clicked', () => {
		const user = userEvent.setup();
		const button = component.container.querySelector('.show-more');
		user.click(button);

		const extraInfo = component.container.querySelector('.extra-info');
		expect(extraInfo).toBeDefined();
	});

	test('ensure when like is clicked twice, it is done twice', async () => {
		const user = userEvent.setup();
		const showMore = component.container.querySelector('.show-more');
		user.click(showMore);
		const extraInfo = component.container.querySelector('.extra-info');
		expect(extraInfo).toBeDefined();

		const button = component.container.querySelector('.like');
		await user.click(button);
		await user.click(button);

		expect(updateBlog.mock.calls).toHaveLength(2);
	});
});
