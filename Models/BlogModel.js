const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
	title : {
		type : String,
		required : true,
		default : 'Untitled post'
	},
	body : {
		type : String,
		required : true,
	},
	likes : {
		type : Number,
		default : 0,
		required : true
	},
	author : {
		type : String,
		required : true
	}
},
{
	timestamps : true
});

module.exports = mongoose.model('Blog' , BlogSchema);