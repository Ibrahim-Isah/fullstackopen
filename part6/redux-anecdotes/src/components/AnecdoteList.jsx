import { useDispatch, useSelector } from 'react-redux';
import { addVote } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
	const anecdotes = useSelector((state) => state.anecdotes);
	const filter = useSelector((state) => state.filter);
	const dispatch = useDispatch();

	const vote = (id) => {
		dispatch(addVote(id));
	};

	return (
		<div>
			{anecdotes
				.sort((a, b) => b.votes - a.votes)
				.filter((anecdote) => anecdote.content.includes(filter))
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
