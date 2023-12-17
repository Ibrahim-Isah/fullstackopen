require('dotenv').config();

const PORT = process.env.PORT || 3001;
let MONGODB_URI = process.env.MONGODB_LOCAL;

if (process.env.NODE_ENV === 'tests') {
	MONGODB_URI = process.env.TEST_MONGODB_URI;
}

module.exports = {
	PORT,
	MONGODB_URI,
};
