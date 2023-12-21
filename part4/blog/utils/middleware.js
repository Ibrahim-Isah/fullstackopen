const logger = require('./logger');
const config = require('./config');
const jwt = require('jsonwebtoken');

const requestLogger = (req, res, next) => {
	logger.info('Method:', req.method);
	logger.info('Path:  ', req.path);
	logger.info('Body:  ', req.body);
	logger.info('...');

	next();
};

const unknownEndpoint = (req, res) => {
	return res.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (err, req, res, next) => {
	logger.error('error', err);

	if (err.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' });
	} else if (err.name === 'ValidationError') {
		return res.status(400).json({ error: err.message });
	} else if (error.name === 'JsonWebTokenError') {
		return response.status(401).json({ error: error.message });
	} else if (error.name === 'TokenExpiredError') {
		return response.status(401).json({ error: 'token expired' });
	} else if (error.name === 'ReferenceError') {
		return response.status(404).json({ error: 'not found' });
	}

	next(err);
};

const tokenExtractor = (req, res, next) => {
	const authorization = req.get('authorization');
	if (authorization && authorization.startsWith('Bearer ')) {
		req.token = authorization.replace('Bearer ', '');
	}
	next();
};

const userExtractor = (req, res, next) => {
	const token = req.token;
	if (token) {
		const decodedToken = jwt.verify(token, config.SECRET);
		if (!decodedToken.id) {
			return res.status(401).json({ error: 'token invalid' });
		}
		req.user = decodedToken.id;
	}
	next();
};

module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler,
	tokenExtractor,
	userExtractor,
};
