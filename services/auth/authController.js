const jwt = require('jsonwebtoken');
const config = require('../../config');

const generateJWT = user => {
	const payload = {
		subject: user.id,
		username: user.username
	};
	const options = {
		expiresIn: "8h"
	};
	return jwt.sign(payload, config.jwtSecret, options);
};

module.exports = {
  generateJWT
};
