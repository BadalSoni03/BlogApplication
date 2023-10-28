const express = require('express');
const dotenv = require('dotenv'); 
const cors = require('cors');
const connectToDB = require("./Config/db");
const authRouter = require('./Routes/authRouter');
const blogRouter = require('./Routes/blogRouter');
const userRouter = require('./Routes/userRouter');
dotenv.config();
connectToDB()

const port = process.env.port || 8080;
const app = express(); 

app.use(express.json());
app.use(cors());
app.listen(port , () => {
	console.log("Server is running on http://localhost:" + port);
});


app.use('/auth' , authRouter);
app.use('/blog' , blogRouter);
app.use('/user' , userRouter);
