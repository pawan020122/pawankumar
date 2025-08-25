import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRouter from './routes/userRoutes.js'
import router from './routes/blogRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.get('/',(req,res)=>{
    res.send("api is running");
})

app.use('/api/users', userRouter);
app.use("/api/blogs", router);
connectDB();


app.listen(process.env.PORT, ()=>{
    console.log("server is running on port", process.env.PORT);
})
