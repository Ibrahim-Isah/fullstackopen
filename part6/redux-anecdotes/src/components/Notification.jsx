import { useSelector } from 'react-redux';

const Notification = () => {
	const notification = useSelector((state) => state.notification);
	const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1,
		margin: '20px auto',
	};

	if (!notification || notification === '') {
		return null;
	}

	return <div style={style}>{notification}</div>;
};

export default Notification;
