const mongoose = require("mongoose");

const connectToDB = async () => {
	try {
		await mongoose.connect(process.env.MONGOOSE_URL , {
			useNewUrlParser : true,
			useUnifiedTopology : true
		});
		console.log("Connection to mongoose database is successfull");
	} 
	catch(error) {
		console.log("There is an error in connecting with the mongoose database " + error);
	}
};
module.exports = connectToDB;