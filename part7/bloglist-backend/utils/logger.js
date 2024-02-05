const info = (...params) => {
	if (process.env.NODE_ENV !== 'tests') {
		console.log(...params);
	}
};
const error = (...params) => {
	if (process.env.NODE_ENV !== 'tests') {
		console.error(...params);
	}
};

module.exports = {
	info,
	error,
};
