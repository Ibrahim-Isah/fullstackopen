require('dotenv').config();

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_LOCAL = process.env.MONGODB_LOCAL;

module.exports = {
	PORT,
	MONGODB_URI,
	MONGODB_LOCAL,
};
