import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';

export const app = express();
app.use(express.json());

const url = "mongodb://127.0.0.1:27017/mern"

mongoose.connect(url,{})
.then(result=> console.log("database connected"))
.catch(err=>console.log(err))

app.listen(3000, () => {
    console.log("Server listening on 3000");
});

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);


app.use( (err,req,res,next)=>{
const statusCode = err.statusCode||500;
const message = err.message ||'Internal Server Error';
return res.status(statusCode).json({
success:false,
message,
statusCode,
});
});