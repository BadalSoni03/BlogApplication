const JWT = require("jsonwebtoken");
const User = require("../Models/User");


//--------------------------POST Controllers-------------------------//

const registerController = async function (req , res) {
	const {username , email , password} = req.body;
	const isNewUser = await User.newUserOrNot(email);
	if (!isNewUser) {
		return res.status(401).send({
			success : false,
			message : 'User already registered'
		});
	}

	const newUser = await User.create({
		username,
		email,
		password
	});
	if (newUser) {
		return res.status(201).send({
			success : true,
			message : 'User registered successfully',
			newUser
		});
	} else {
		return res.status(501).send({
			success : false,
			message : 'Error in register API'
		});
	}
};

const loginController = async function (req , res) {
	const {email , password} = req.body;
	const user = await User.findOne({email});
	if (!user) {
		return res.status(401).send({
			success : false,
			message : 'User not registered'
		});
	}
	const isMatch = user.comparePassword(password);
	if (!isMatch) {
		return res.status(401).send({
			success : false,
			message : 'email / password not matching',
		});
	}

	const token = JWT.sign({userId : user._id} , process.env.JWT_SECRET_KEY , {expiresIn : '1d'});
	let oldTokens = user.tokens || [];
	
	if (oldTokens.length) {
		oldTokens = oldTokens.filter(tkn => {
			const timeDiff = (Date.now() - parseInt(tkn.signedAt)) / 1000;
			if (timeDiff < 86400) {
				return tkn;
			}
		});
	}

	await User.findByIdAndUpdate(user._id , {
		tokens : [...oldTokens , {
			token,
			signedAt : Date.now().toString()
		}]
	});
	const info = {
		Username : user.username,
		email : user.email,
		token
	};
	return res.status(201).send({
		success : true,
		message : 'User logged in successfully',
		info
	});
};

const logoutController = async function (req , res) {
	try {
		if (req.headers && req.headers.authorization) {
			const token = req.headers.authorization.split(' ')[1];
			if (!token) {
				return res.status(501).send({
					success : false,
					message : 'Authorization failed'
				});
			}
			const tokens = req.user.tokens;
			const notExpiredTokens = tokens.filter(t => t.token !== token);
			await User.findByIdAndUpdate(req.user._id , {tokens : notExpiredTokens});
			return res.status(201).send({
				success : true,
				message : 'logged out successfully'
			});
		} else {
			return res.status(501).send({
				success : false,
				message : 'Cannot logout'
			});
		}
	} catch (error) {
		return res.status(501).send({
			success : false,
			message : 'Error in logout API'
		});
	}
};

module.exports = {
	registerController,
	loginController,
	logoutController
};
