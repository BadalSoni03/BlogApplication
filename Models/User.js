const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	username : {
		type : String,
		required : true,
		unique : true,
		trim : true,
		lowercase : true
	}, 
	password : {
		type : String,
		required : true,
		trim : true
	},
	isAdmin : {
		type : Boolean,
		default : false
	},
	email : {
		type : String,
		required : true,
		unique : true,
		trime : true
	},
	bookMarks : [{type : mongoose.Types.ObjectId , ref : 'Blog' , default : []}],
	blogs : {
		type : Map,
		of : String,
		default : new Map()
	},
	tokens : [{type : Object}],
	passwordToken : {
		type : String,
		default : ''
	}
}, 
{
	timespamps : true
});

userSchema.pre('save' , async function (next) {
	try {
		if (!this.isModified('password')) {
			return next();
		}
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(this.password , salt);
		this.password = hashedPassword;
		next();
	} catch (error) {
		console.log('Error while hashing the password : ' + error.message);
	}
});

userSchema.methods.comparePassword = async function (enteredPassword) {
	try {
		if (!enteredPassword) {
			throw new Error('Password is missing');
		}
		const result = await bcrypt.compare(enteredPassword , this.password);
		return result;
	} catch (error) {
		console.log('Error while comparing passwords');
	}
};

module.exports = mongoose.model('User' , userSchema);
