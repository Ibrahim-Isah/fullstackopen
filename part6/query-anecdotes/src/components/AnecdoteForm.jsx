import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNew } from '../services/anecdotes';

const AnecdoteForm = () => {
	const queryClient = useQueryClient();

	const newAnecdote = useMutation({
		mutationFn: createNew,
		onSuccess: (data) => {
			const anecdotes = queryClient.getQueryData(['anecdotes']);
			if (anecdotes) {
				queryClient.setQueryData(['anecdotes'], anecdotes.concat(data));
			}

			// queryClient.invalidateQueries(['anecdotes']);
		},
	});

	const onCreate = (event) => {
		event.preventDefault();
		const content = event.target.anecdote.value;
		event.target.anecdote.value = '';
		newAnecdote.mutate({
			content,
			votes: 0,
		});
	};

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name='anecdote' />
				<button type='submit'>create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
