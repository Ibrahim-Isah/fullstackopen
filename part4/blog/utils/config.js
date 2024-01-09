require('dotenv').config();

const PORT = process.env.PORT || 3001;
const SECRET = process.env.SECRET;
let MONGODB_URI = process.env.MONGODB_LOCAL;
const NODE_ENV = process.env.NODE_ENV;

if (process.env.NODE_ENV === 'tests') {
	MONGODB_URI = process.env.TEST_MONGODB_URI;
}

module.exports = {
	PORT,
	MONGODB_URI,
	SECRET,
	NODE_ENV,
};
