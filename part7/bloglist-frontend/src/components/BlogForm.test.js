import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import BlogForm from './BlogForm';

describe('<BlogForm />', () => {
	let component;
	const addNewBlog = jest.fn();

	beforeEach(() => {
		component = render(<BlogForm addNewBlog={addNewBlog} />);
	});

	test('check if all values when submitted are valid', async () => {
		const user = userEvent.setup();

		const button = component.container.querySelector('button');
		const title = component.container.querySelector('#title');
		const url = component.container.querySelector('#url');
		const author = component.container.querySelector('#author');
		await act(async () => {
			await user.type(title, 'some title');
			await user.type(url, 'https://some.url');
			await user.type(author, 'isah');

			await button.click();
		});

		expect(addNewBlog.mock.calls).toHaveLength(1);
		expect(addNewBlog.mock.calls[0][0]).toBe('some title');
		expect(addNewBlog.mock.calls[0][1]).toBe('https://some.url');
		expect(addNewBlog.mock.calls[0][2]).toBe('isah');
	});
});
