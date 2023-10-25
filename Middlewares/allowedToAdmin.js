const isAuth = require('../Middlewares/isAuth');

// Middleware to check if the req.user is admin or not
const allowedToAdmin = async (req , res , next) => {
	isAuth(req , res , () => {
		if (req.user && req.user.isAdmin) {
			next(); 
		} else {
			return res.status(401).send({
				success : false,
				message : 'You are not allowed to perform this action'
			});
		}
	});
};

module.exports = allowedToAdmin;
