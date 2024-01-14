import { useEffect } from 'react';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import FilterAnecdote from './components/FilterAnecdote';
import Notification from './components/Notification';
import { initAnecdotes } from './reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';

const App = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(initAnecdotes());
	}, [dispatch]);
	return (
		<div>
			<h2>Anecdotes</h2>
			<Notification />
			<FilterAnecdote />
			<AnecdoteList />
			<AnecdoteForm />
		</div>
	);
};

export default App;
