import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { getAll, voteById } from './services/anecdotes';

const App = () => {
	const queryClient = useQueryClient();
	const voteMutation = useMutation({
		mutationFn: voteById,
		onSuccess: () => {
			queryClient.invalidateQueries(['anecdotes']);
		},
		onError: (err) => {
			console.error('something went wrong', err);
		},
	});
	const handleVote = (anecdote) => {
		voteMutation.mutate({
			...anecdote,
			votes: anecdote.votes + 1,
		});
	};

	const response = useQuery({
		queryKey: ['anecdotes'],
		queryFn: getAll,
		retry: 1,
	});

	if (response.isError) {
		return <div>anecdote service not available due to problems in server</div>;
	}

	if (response.isLoading) {
		return <div>loading...</div>;
	}

	return (
		<div>
			<h3>Anecdote app</h3>

			<Notification />
			<AnecdoteForm />

			{response.data.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>vote</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default App;
