import React from 'react';

const Notification = ({ message }) => {
	if (message === null) {
		return null;
	}

	if (message.includes('ERROR')) {
		return (
			<div
				style={{
					color: 'red',
					border: '1px solid red',
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
					border: '1px solid green',
					borderRadius: '5px',
					padding: '10px',
					marginBottom: '10px',
				}}
				className='error'
			>
				{message}
			</div>
		);
	}
};

export default Notification;
