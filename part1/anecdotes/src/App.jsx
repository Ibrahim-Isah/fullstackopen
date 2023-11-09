import { useState } from 'react';

const anecdotes = [
	'If it hurts, do it more often.',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
	'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
	'The only way to go fast, is to go well.',
];

const Header = ({ name }) => {
	return <h2>{name}</h2>;
};

const Anecdote = ({ text, votesCount }) => {
	return (
		<p>
			{text} has {votesCount} votes
		</p>
	);
};

const Winner = ({ anecdotes, allVotes }) => {
	const max = Math.max(...allVotes);
	const index = allVotes.indexOf(max);
	const winner = anecdotes[index];

	if (max === 0) {
		return <p>No votes yet</p>;
	}

	return (
		<div>
			<p>{winner}</p>
			<p>has {max} votes</p>
		</div>
	);
};

const Button = ({ handleClick, text }) => {
	return <button onClick={handleClick}>{text}</button>;
};

function App() {
	const [selected, setSelected] = useState(0);
	const [allVotes, setAllVotes] = useState(Array(8).fill(0));

	const handleAnecdoteClick = () => {
		const arrayIndex = Math.floor(Math.random() * anecdotes.length);
		setSelected(arrayIndex);
	};

	const handleVoteClick = () => {
		const newAllVotes = [...allVotes];
		newAllVotes[selected] += 1;
		setAllVotes(newAllVotes);
	};

	return (
		<>
			<div>
				<Header name='Anecdote of the day' />
				<Anecdote text={anecdotes[selected]} votesCount={allVotes[selected]} />
				<Button handleClick={handleVoteClick} text='vote' />
				<Button handleClick={handleAnecdoteClick} text='next anecdote' />

				<Header name='Anecdote with most votes' />
				<Winner anecdotes={anecdotes} allVotes={allVotes} />
			</div>
		</>
	);
}

export default App;
