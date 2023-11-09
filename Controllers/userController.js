const bcrypt = require('bcrypt');
const User = require('../Models/User');
const Blog = require('../Models/Blog');
const sendResetPasswordMail = require('../Utils/sendMail');
const generateToken = require('../Utils/generateToken')


//----------------------------POST Controllers------------------------//


const forgotPasswordController = async function (req , res) {
	try {
		const userEmail = req.body.email;
		const userFound = await User.findOne({email : userEmail});
		if (!userFound) {
			return res.status(400).send({
				success : false,
				message : 'User not found'
			});
		}
		const token = generateToken();
		await User.updateOne({email : userEmail} , {
			$set : {
				passwordToken : token
			}
		});
		const info = await sendResetPasswordMail(userFound.username , userEmail , token);
		if (info === 'Error while sending the mail') {
			return res.status(500).send({
				success : false,
				message : 'Error while sending the mail'
			});
		}
		return res.status(200).send({
			success : true,
			message : 'Reset password mail has been sent to your account , please check your inbox or spam folder'
		});
	} catch (error) {
		return res.status(500).send({
			success : false,
			message : 'Error in forgotPasswordController Public API',
			error : error.message
		});
	}
}



//----------------------------GET Controllers-------------------------//


const resetPasswordController = async function (req , res) {
	try {
		const newPassword = req.body.password;
		const token = req.query.token;
		const user = await User.findOne({passwordToken : token});
		if (!user) {
			return res.status(400).send({
				success : false,
				message : 'Link has been expired'
			});
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(newPassword , salt);
		
		await User.findByIdAndUpdate({_id : user._id} , {
			$set : {
				password : hashedPassword,
				passwordToken : ''
			}
		} , {new : true});
		return res.status(200).send({
			success : true,
			message : 'Password reset successfull'
		});
	} catch (error) {
		return res.status(500).send({
			success : false,
			message : 'Error in resetPasswordController Public API',
			error : error.message
		});
	}
};

const getAllUsersController = async function (req , res) {
	try {
		const allUsers = await User.find({} , {
			username : 1,
			email : 1,
			blogs : 1
		}); 
		return res.status(200).send({
			success : true,
			message : 'User fetched successfully',
			users : allUsers
		});

	} catch (error) {
		return res.status(501).send({
			success : false,
			message : 'Error in getAllUsersController Public API',
			error : error.message
		});
	}
};

const viewProfileController = async function (req , res) {
	try {
		const username = req.body.username;
		const fetchedUser = await User.findOne({username} , {
			__v : 0,
			createAt : 0,
			updatedAt : 0
		});
		if (fetchedUser) {
			const userBlogs = fetchedUser.blogs; 
			let itr = userBlogs.keys();

			const allBlogs = await Blog.find({_id : {
				$in : itr.next().value
			}} , {__v : 0});

			return res.status(200).send({
				success : true,
				message : 'User fetched successfully',
				username : fetchedUser.username,
				email : fetchedUser.email,
				blogsCount : userBlogs.size,
				allBlogs : allBlogs
			});
		} 
		return res.status(401).send({
			success : false,
			message : 'User does not exist'
		});
	} catch (error) {
		return res.status(501).send({
			success : false,
			message : 'Error in viewProfileController Public API',
			error : error.message
		});
	}
};


//----------------------------DELETE Controllers-------------------------//


const deleteUserController = async function (req , res) {
	try {
		const email = req.body.email;
		let successFlag = true;
		let statusCode = 200;
		let successMessage = '';
		if (!await User.findOne({email})) {
			successFlag = false;
			statusCode = 400;
			successMessage = 'No such user exists in the database';
		} else {
			await User.deleteOne({email});
			successMessage = 'User deleted successfully';
		}

		return res.status(statusCode).send({
			success : successFlag,
			message : successMessage
		});
	} catch (error) {
		return res.status(500).send({
			success : false,
			message : 'Error in deleteUserController Public API',
			error : error.message
		});
	}
};

module.exports = {
	getAllUsersController,
	deleteUserController,
	viewProfileController,
	forgotPasswordController,
	resetPasswordController
};
