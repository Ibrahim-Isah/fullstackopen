import { useDispatch } from 'react-redux';
import { addFilter } from '../reducers/filterReducer';

const FilterAnecdote = () => {
	const dispatch = useDispatch();
	const handleChange = (e) => {
		dispatch(addFilter(e.target.value));
	};
	return (
		<div
			style={{
				marginBottom: 10,
			}}
		>
			filter <input onChange={handleChange} />
		</div>
	);
};

export default FilterAnecdote;
