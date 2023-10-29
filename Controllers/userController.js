const User = require('../Models/User');
const Blog = require('../Models/Blog');


//----------------------------GET Controllers-------------------------//

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
			username : 1,
			email : 1,
			blogs : 1
		});
		if (fetchedUser) {
			return res.status(200).send({
				success : true,
				message : 'User fetched successfully',
				user : fetchedUser
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
	viewProfileController
};
