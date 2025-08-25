import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
dotenv.config();



const app = express();

app.use(express.json());
app.get('/',(req,res)=>{
    res.send("api is running");
})
connectDB();


app.listen(process.env.PORT, ()=>{
    console.log("server is running on port", process.env.PORT);
})
