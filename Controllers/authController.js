const JWT = require("jsonwebtoken");
const User = require("../Models/User");


//--------------------------POST Controllers-------------------------//

const registerController = async function (req , res) {
	try {
		const {username , email , password , isAdmin = false} = req.body;
		const userFound = await User.findOne({email});
		if (userFound) {
			return res.status(401).send({
				success : false,
				message : 'User already registered'
			});
		}
		const newUser = await User({
			username,
			email,
			password,
			isAdmin
		});
		await newUser.save();
		return res.status(201).send({
			success : true,
			message : 'User registered successfully',
			user : newUser
		});
	} catch (error) {
		return res.status(500).send({
			success : false,
			message : 'Error in registerController Public API'
		})
	}
};

const loginController = async function (req , res) { 
	try {
		const {email , password} = req.body;
		const user = await User.findOne({email});
		if (!user) {
			return res.status(401).send({
				success : false,
				message : 'User not registered'
			});
		}
		const isMatch = await user.comparePassword(password);
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
			isAdmin : user.isAdmin,
			token : token
		};
		return res.status(200).send({
			success : true,
			message : 'User logged in successfully',
			info
		});
	} catch (error) {
		return res.status(500).send({
			success : false,
			message : 'Error in loginController Public API',
			error : error.message
		});
	}
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
			message : 'Error in logoutController Public API'
		});
	}
};

module.exports = {
	registerController,
	loginController,
	logoutController
};
