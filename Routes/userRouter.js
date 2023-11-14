const express = require('express');
const router = express.Router();
const isAuth = require('../Middlewares/isAuth');
const allowedToAdmin = require('../Middlewares/allowedToAdmin');
const {
	getAllUsersController,
	deleteUserController,
	viewProfileController,
	forgotPasswordController,
	resetPasswordController
} = require('../Controllers/userController');


//---------------------------POST APIs---------------------------//


/*
	@desc : sends request for forgot password 
	@API  : Public API
	@method : post
	@request : http post request
*/

router.post('/account/forgot-password' , forgotPasswordController);


//---------------------------GET APIs---------------------------//


/*
	@desc : fetches all the users in the database 
	@API  : Public API
	@method : get
	@request : http get request
	@note : Allowed to admin only
*/

router.get('/all-users' , allowedToAdmin , getAllUsersController);


/*
	@desc : fetches the profile of a user 
	@API  : Public API
	@method : get
	@request : http get request
	@note : No need for middleware as anyone can view the profile of a user
*/

router.get('/profile' , viewProfileController);

/*
	@desc : fetches all the users in the database 
	@API  : Public API
	@method : get
	@request : http get request
	@note : Allowed to admin only
*/

router.get('/account/reset-password' , resetPasswordController);


//-------------------------DELETE APIs--------------------------//


/*
	@desc : deletes / blocks a user 
	@API  : Public API
	@method : delete
	@request : http delete request
	@note : Allowed to admins only
*/

router.delete('/delete-user' , allowedToAdmin , deleteUserController);


module.exports = router;
