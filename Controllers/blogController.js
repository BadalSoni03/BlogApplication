const Blog = require('../Models/BlogModel');
const User = require('../Models/UserModel');
const mongoose = require('mongoose');


//--------------------------POST Controllers-------------------------//

const createBlogController = async function (req , res) { 
	try {
		const {title , body , author} = req.body;
		const currentUser = await User.findOne({username : author});
		if (!currentUser) { 
			console.log(author);
			return res.status(401).send({
				success : false,
				message : 'Not Allowed'
			});
		}
		const timeOfCreation = Date.now();
		const blog = await Blog.create({
			title,
			body,
			author,
			timeOfCreation
		});

		currentUser.blogs.push(blog);
		return res.status(201).send({
			success : true,
			message : 'Blog created successfully',
			blog
		});
	} catch (error) {
		return res.status(501).send({
			success : false,
			message : 'Error in create API',
			error : error.message
		});
	}
};

// This is basically the toggle like function like instagram. A user can like a blog only once
// and if the user again tries to like the blog then it automatically unlikes (toggle) the blog.
const likeBlogController = async function (req , res) {
	try {
		const {username , id} = req.params;
		const blog = await Blog.findById({_id : id});
		if (!blog) {
			return res.status(401).send({
				success : false,
				message : 'No such blog exist'
			});
		}
		let likedBlogs = blog.likes;
		if (likedBlogs.length && likedBlogs.includes(username)) {
			likedBlogs = likedBlogs.filter(user => user !== username);
		}  else {
			likedBlogs.push(username);
		}
		blog.likes = likedBlogs;
		await blog.save();
		return res.status(201).send({
			success : true,
			message : 'Liked successfully',
			likesCount : blog.likes.length,
			likedBy : blog.likes
		});
	} catch (error) { 
		console.log(error.message);
		return res.status(501).send({
			success : false,
			message : 'Error in likeBlogController API',
			error : error.message
		});
	}
}


//----------------------------GET Controllers-------------------------//

const getAllBlogsOfAUserController = async function (req , res) {
	try {
		const author = req.params.username;
		const userFound = await User.findOne({username : author});
		if (!userFound) {
			return res.status(401).send({
				success : false,
				message : 'User of such username does not exist'
			});
		}

		const allBlogs = await Blog.find({author}); 
		return res.status(201).send({
			success : true,
			message : 'Blogs fetched successfully',
			allBlogs
		});
	} catch (error) {
		return res.status(501).send({
			success : false,
			message : 'Error in getAllBlogsOfAUser API',
			error : error.message
		});
	}
};

const getAllUsersController = async function (req , res) {
	try {
		const allUsers = await User.find({}); 
		return res.status(201).send({
			success : true,
			message : 'User fetched successfully',
			users : allUsers
		});

	} catch (error) {
		return res.status(501).send({
			success : false,
			message : 'Error in getAllUsersController API',
			error : error.message
		});
	}
}

module.exports = {
	createBlogController,
	getAllBlogsOfAUserController,
	likeBlogController,
	getAllUsersController
};
