const express = require('express');
const router = express.Router();
const isAuth = require('../Middlewares/isAuth');
const {
	createBlogController,
	getAllBlogsOfAUserController,
	likeBlogController
} = require('../Controllers/blogController');

//-------------------------POST APIs-------------------------//
router.post('/create' , isAuth , createBlogController);
router.post('/like/:username/:id' , isAuth , likeBlogController);

//-------------------------GET APIs--------------------------//
router.get('/fetch/:username', getAllBlogsOfAUserController);


module.exports = router;
