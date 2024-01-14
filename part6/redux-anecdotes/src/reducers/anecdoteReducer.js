import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdotes';

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {
		addAnecdote(state, action) {
			state.push(action.payload);
		},
		initializeAnectodes(state, action) {
			return action.payload;
		},
		addVote(state, action) {
			return state.map((anecdote) =>
				anecdote.id === action.payload
					? { ...anecdote, votes: anecdote.votes + 1 }
					: anecdote
			);
		},
	},
});

export const { addAnecdote, addVote, initializeAnectodes } =
	anecdoteSlice.actions;

export const createAnecdote = (content) => {
	return async (dispatch) => {
		const newAnecdote = await anecdoteService.createNew(content);
		dispatch(addAnecdote(newAnecdote));
	};
};

export const initAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll();
		dispatch(initializeAnectodes(anecdotes));
	};
};

export const voteAnecdote = (id) => {
	return async (dispatch) => {
		const updatedAnecdote = await anecdoteService.voteAdd(id);
		dispatch(addVote(updatedAnecdote.id));
	};
};

export default anecdoteSlice.reducer;
