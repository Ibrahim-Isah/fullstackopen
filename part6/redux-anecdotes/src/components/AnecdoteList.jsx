import { useDispatch, useSelector } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';
import {
	addNotification,
	clearNotification,
} from '../reducers/notificationReducer';

const AnecdoteList = () => {
	const anecdotes = useSelector((state) => state.anecdotes);
	const filter = useSelector((state) => state.filter);
	const dispatch = useDispatch();

	const vote = (id) => {
		dispatch(
			addNotification(
				`you voted '${anecdotes.find((a) => a.id === id).content}'`
			)
		);
		dispatch(addVote(id));
		setTimeout(() => {
			dispatch(clearNotification());
		}, 3000);
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
