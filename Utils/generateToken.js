const randomstring = require('randomstring');

const generateToken = () => {
	return randomstring.generate();
}
module.exports = generateToken;
