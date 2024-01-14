import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
	const anecdotes = useSelector((state) => state.anecdotes);
	const filter = useSelector((state) => state.filter);
	const dispatch = useDispatch();

	const vote = (id) => {
		dispatch(
			showNotification(
				`you voted '${anecdotes.find((a) => a.id === id).content}'`,
				3000
			)
		);
		dispatch(voteAnecdote(id));
	};

	return (
		<div>
			{anecdotes
				.filter((anecdote) => anecdote.content.includes(filter))
				.sort((a, b) => b.votes - a.votes)
				.map((anecdote) => (
					<div key={anecdote.id}>
						<div>{anecdote.content}</div>
						<div>
							has {anecdote.votes}
							<button onClick={() => vote(anecdote.id)}>vote</button>
						</div>
					</div>
				))}
		</div>
	);
};

export default AnecdoteList;
