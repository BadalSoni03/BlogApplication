const express = require('express');
const router = express.Router();
const isAuth = require('../Middlewares/isAuth');
const {
	registerController,
	loginController,
	logoutController
} = require('../Controllers/authController');
const {
	registerValidation,
	loginValidation,
	userValidation
} = require('../Middlewares/Validation/validateUser');


//-------------------------POST APIs--------------------------//


/*
	@desc : registers / signup the user
	@API  : Public API
	@method : post
	@request : http post request
*/

router.post('/register' , registerValidation , userValidation , registerController);


/*
	@desc : logins / signin the user
	@API  : Public API
	@method : post
	@request : http post request
*/

router.post('/login' , loginValidation , userValidation , loginController);


/*
	@desc : logouts / signout the user'
	@API  : Public API
	@method : post
	@request : http post request
*/

router.post('/logout' , isAuth , logoutController);

module.exports = router;
