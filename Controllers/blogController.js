const Blog = require('../Models/Blog');
const User = require('../Models/User');


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
		await currentUser.save();
		return res.status(201).send({
			success : true,
			message : 'Blog created successfully',
			newBlog : blog
		});
	} catch (error) {
		return res.status(501).send({
			success : false,
			message : 'Error in createBlogController Public API',
			error : error.message
		});
	}
};

const likeBlogController = async function (req , res) {
	try {
		const blogID = req.params.blogID;
		const username = req.user.username;
		const blog = await Blog.findById({_id : blogID});
		if (!blog) {
			return res.status(401).send({
				success : false,
				message : 'Blog not found'
			});
		}
		let likedBlogs = blog.likes;
		if (likedBlogs.size && likedBlogs.has(username)) {
			likedBlogs.delete(username);
		} else {
			likedBlogs.set(username , '1');
		}
		blog.likes = likedBlogs;
		await blog.save();
		return res.status(201).send({
			success : true,
			message : 'Liked successfully',
			likesCount : blog.likes.size,
			likedBy : blog.likes
		});
	} catch (error) { 
		console.log(error.message);
		return res.status(501).send({
			success : false,
			message : 'Error in likeBlogController Public API',
			error : error.message
		});
	}
}

const bookMarkBlogController = async function (req , res) {
	try {
		const userID = req.user.id;
		const blogID = req.params.blogID;
		const blog = await Blog.findById({_id : blogID});
		const user = await User.findById({_id : userID});
		if (!blog || !user) {
			return res.status(401).send({
				success : false,
				message : 'blog / user not found'
			});
		}
		user.bookMarks.push(blog);
		await user.save();
		return res.status(200).send({
			success : true,
			message : 'Blog added to bookmarks successfully',
			bookMarks : user.bookMarks
		});
	} catch (error) {
		return res.status(501).send({
			success : false,
			message : 'Error in bookMarkBlogController Public API',
			error : error.message
		});
	}
}


//----------------------------GET Controllers-------------------------//

const getAllBlogsOfAUserController = async function (req , res) {
	try {
		const username = req.params.username;
		const userFound = await User.findOne({username} , {blogs : 1});
		if (!userFound) {
			return res.status(401).send({
				success : false,
				message : 'User of such username does not exist'
			});
		}

		const allBlogs = await Blog.find({author : username} , {
			author : 1,
			title : 1,
			body : 1,
			likes : 1
		}); 
		return res.status(200).send({
			success : true,
			message : 'Blogs fetched successfully',
			allBlogs
		});
	} catch (error) {
		return res.status(501).send({
			success : false,
			message : 'Error in getAllBlogsOfAUser Public API',
			error : error.message
		});
	}
};


//----------------------------DELETE Controllers-------------------------//

const deleteBlogController = async function (req , res) {
	try {
		const blogID = req.params.blogID;
		const blog = await Blog.findById({_id : blogID});
		if (!blog) {
			return res.status(401).send({
				success : false,
				message : 'Blog not found'
			});
		}

		await Blog.deleteOne({_id : blogID});
		return res.status(200).send({
			success : true,
			message : 'Blog deleted successfully'
		});
	} catch (error) {
		return res.status(501).send({
			success : false,
			message : 'Error in deleteBlogController Public API',
			error : error.message
		});
	}
}


//----------------------------PUT Controllers-------------------------//

const updateBlogController = async function (req , res) {
	try {
		const {title , body} = req.body;
		const blogID = req.params.blogID;
		const updatedBlog = await Blog.findByIdAndUpdate({_id : blogID} , {
			title,
			body
		} , {new : true});
		if (!updatedBlog) {
			return res.status(401).send({
				success : false,
				message : 'Blog not found'
			});
		}
		return res.status(200).send({
			success : true,
			message : 'Blog updated successfully',
			blog : updatedBlog
		});
	} catch (error) {
		return res.status(501).send({
			success : false,
			message : 'Error in updateBlogController Public API',
			error : error.message
		});
	}
}


module.exports = {
	createBlogController,
	getAllBlogsOfAUserController,
	likeBlogController,
	deleteBlogController,
	updateBlogController,
	bookMarkBlogController
};
