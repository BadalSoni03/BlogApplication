require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	host : 'smtp.gmail.com',
	port : 587,
	secure : false,
	requireTLS : true,
	auth : {
		user : process.env.gmailID,
		pass : process.env.gmailPassword
	}
});

const sendResetPasswordMail = async function (name , email , token) {
	try {
		const host = process.env.HOST;
		const port = process.env.PORT;
		const mailOptions = {
			from : process.env.gmailID,
			to : email,
			subject : 'Reset password mail',
			html : '<p> Jai Shree Ram '+name+', please copy the link <a href = "http://'+host+':'+port+'/user/account/reset-password?token='+token+'"> reset your password</a>'
		};
		await transporter.sendMail(mailOptions)
		.then(info => {
			return info;
		})
		.catch(error => {
			console.log(error.message);
			return 'Error while sending the mail';
		});
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = sendResetPasswordMail;
