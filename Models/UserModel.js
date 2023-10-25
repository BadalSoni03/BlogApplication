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
	blogs : [{type : mongoose.Types.ObjectId , ref : 'BlogModel' , required : true}],
	tokens : [{type : Object}] 
},
{timespamps : true}
);

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
		return await bcrypt.compare(enteredPassword , this.password);
	} catch (error) {
		console.log('Error while comparing passwords');
	}
};

userSchema.statics.newUserOrNot = async function (email) {
	if (!email) throw new Error('Invalid email address');
	try {
		const user = await this.findOne({email});
		if (user) {
			return false;
		}
		return true;
	} catch (error) {
		console.log('Something went wrong in newUserOrNot method : ' + error.message);
		return false;
	}
}

module.exports = mongoose.model('User' , userSchema);
