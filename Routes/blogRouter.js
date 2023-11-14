const express = require('express');
const router = express.Router();
const isAuth = require('../Middlewares/isAuth');
const allowedToAdmin = require('../Middlewares/allowedToAdmin');
const {
	createBlogController,
	getAllBlogsOfAUserController,
	likeBlogController,
	deleteBlogController,
	updateBlogController,
	bookMarkBlogController,
	getParticularBlogOfAUserController,
	getAllBlogsController
} = require('../Controllers/blogController');


//-------------------------POST APIs--------------------------//


/*
	@desc : creates the blog 
	@API  : Public API
	@method : post
	@request : http post request
*/

router.post('/create' , isAuth , createBlogController);

/*
	@desc : 'username' likes the blog of blog id 'id' 
	@API  : Public API
	@method : post
	@request : http post request
*/

router.post('/like/:blogID' , isAuth , likeBlogController);

/*
	@desc : bookmarks the blog of blog id 'blogID' 
	@API  : Public API
	@method : post
	@request : http post request
*/

router.post('/bookmark/:blogID' , isAuth , bookMarkBlogController);


//-------------------------GET APIs---------------------------//


/*
	@desc : fetches all the blog of 'username' 
	@API  : Public API
	@method : get
	@request : http get request
	@note : No need for middleware as anyone can view the blogs of a user
*/

router.get('/fetch/:username', getAllBlogsOfAUserController);

/*
	@desc : fetches particular blog of 'username' with 'blogID'
	@API  : Public API
	@method : get
	@request : http get request
	@note : No need for middleware as anyone can view the blogs of a user
*/

router.get('/fetch/:username/:blogID' , getParticularBlogOfAUserController);

/*
	@desc : fetches all the blogs in the database
	@API  : Public API
	@method : get
	@request : http get request
	@note : No need for middleware as anyone can view the blogs of a user
*/

router.get('/blogs' , getAllBlogsController);


//-------------------------DELETE APIs-------------------------//


/*
	@desc : deletes the blog of blog 'blogID'
	@API  : Public API
	@method : delete
	@request : http delete request
*/

router.delete('/delete/:blogID' , isAuth , deleteBlogController);


//---------------------------PUT APIs--------------------------//


/*
	@desc : updates the blog of blog 'blogID'
	@API  : Public API
	@method : put
	@request : http put request
*/

router.put('/update/:blogID' , isAuth , updateBlogController);

module.exports = router;
