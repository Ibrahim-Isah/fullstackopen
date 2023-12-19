export const getTokenFromRequest = (request) => {
	const authorization = request.get(authorization);

	if (authorization && authorization.startsWith('Bearer ')) {
		return authorization.replace('Bearer ', '');
	}

	return null;
};