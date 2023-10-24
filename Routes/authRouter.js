const express = require('express');
const router = express.Router();
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
const isAuth = require('../Middlewares/isAuth');

// user authentication and authorization routes
router.post('/register' , registerValidation , userValidation , registerController);
router.post('/login' , loginValidation , userValidation , loginController);
router.post('/logout' , isAuth , logoutController);

module.exports = router;