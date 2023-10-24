const Blog = require('../Models/BlogModel');
const User = require('../Models/UserModel');

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
		const like = 0;
		const blog = new Blog({
			title,
			body,
			author,
			like,
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
			message : 'Error in createBlogController',
			error : error.message
		});
	}
};

const likeBlogController = async function (req , res) {
	try {
		const uniqueID = req.params.id; 
		const blog = await Blog.findById(uniqueID);
		blog.likes++;
		await blog.save();
		return res.status(201).send({
			success : true,
			message : 'successfully liked the blog'
		});
	} catch (error) {
		return res.status(501).send({
			success : false,
			message : 'Error in likeBlogController',
			error : error.message
		});
	}
};


//----------------------------GET Controllers-------------------------//

const getAllBlogsOfAUserController = async function (req , res) {
	try {
		const {author} = req.body;
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
			message : 'Error in getAllBlogsOfAUser',
			error : error.message
		});
	}
};


module.exports = {
	createBlogController,
	getAllBlogsOfAUserController,
	likeBlogController
};
