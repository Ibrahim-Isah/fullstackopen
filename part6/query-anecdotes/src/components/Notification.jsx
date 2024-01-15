import { useContext } from 'react';
import NotifyContext from '../context/Notification';

const Notification = () => {
	const [state, dispatch] = useContext(NotifyContext);
	const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1,
		marginBottom: 5,
	};

	if (!state || state === '') {
		return;
	}

	return <div style={style}>{state}</div>;
};

export default Notification;
