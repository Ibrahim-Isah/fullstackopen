import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
	const message = useSelector((state) => state.notification);
	if (!message || message === null) {
		return null;
	}

	if (message.includes('ERROR')) {
		return (
			<div
				style={{
					color: 'red',
					background: 'lightgrey',
					fontSize: '20px',
					borderStyle: 'solid',
					borderRadius: '5px',
					padding: '10px',
					marginBottom: '10px',
				}}
				className='error'
			>
				{message}
			</div>
		);
	} else {
		return (
			<div
				style={{
					color: 'green',
					background: 'lightgrey',
					fontSize: '20px',
					borderStyle: 'solid',
					borderRadius: '5px',
					padding: '10px',
					marginBottom: '10px',
				}}
				className='success'
			>
				{message}
			</div>
		);
	}
};

export default Notification;
