const {check , validationResult} = require('express-validator');

const registerValidation = [
	check('username')
	.trim()
	.not()
	.isEmpty()
	.withMessage('username is a required field')
	.isLength({min : 3 , max : 20})
	.withMessage('username must be between 3 to 20 characters'),

	check('email')
	.trim()
	.not()
	.isEmpty()
	.withMessage('email is a required field')
	.normalizeEmail({gmail_remove_dots : false})
	.isEmail()
	.withMessage('Enter a valid email format'),

	check('password')
	.trim()
	.not()
	.isEmpty()
	.withMessage('password is a required field')
];

const loginValidation = [
	check('email')
	.trim()
	.not()
	.isEmpty()
	.withMessage('email is a required field')
	.normalizeEmail({gmail_remove_dots : false})
	.isEmail()
	.withMessage('Enter a valid email format'),

	check('password')
	.trim()
	.not()
	.isEmpty()
	.withMessage('password is a required field')
];

const userValidation = async function (req , res , next) {
	const result = validationResult(req).array();
	if (!res.length) {
		return next();
	}
	const error = result[0].msg;
	return res.status(401).send({
		success : false,
		message : error
	});
};

module.exports = {
	registerValidation,
	loginValidation,
	userValidation
}