require('dotenv').config();

const PORT = process.env.PORT || 3001;
let MONGODB_URI = process.env.MONGODB_URI;

if (process.env.NODE_ENV === 'development') {
	MONGODB_URI = process.env.MONGODB_LOCAL;
}

module.exports = {
	PORT,
	MONGODB_URI,
};
