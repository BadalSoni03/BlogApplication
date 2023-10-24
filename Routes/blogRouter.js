const express = require('express');
const router = express.Router();
const isAuth = require('../Middlewares/isAuth');
const {
	createBlogController,
	getAllBlogsOfAUserController,
	likeBlogController
} = require('../Controllers/blogController');

router.post('/create' , isAuth , createBlogController);
router.post('/like/:id' , isAuth , likeBlogController);
router.get('/fetch', getAllBlogsOfAUserController);
module.exports = router;