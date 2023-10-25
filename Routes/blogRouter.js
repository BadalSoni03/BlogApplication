const express = require('express');
const router = express.Router();
const isAuth = require('../Middlewares/isAuth');
const allowedToAdmin = require('../Middlewares/allowedToAdmin');
const {
	createBlogController,
	getAllBlogsOfAUserController,
	likeBlogController,
	getAllUsersController
} = require('../Controllers/blogController');

//-------------------------POST APIs-------------------------//

router.post('/create' , isAuth , createBlogController);
router.post('/like/:username/:id' , isAuth , likeBlogController);


//-------------------------GET APIs--------------------------//

router.get('/fetch/:username', getAllBlogsOfAUserController);
router.get('/all-users', allowedToAdmin , getAllUsersController);

module.exports = router;
