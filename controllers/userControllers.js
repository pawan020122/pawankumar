import User from "../models/userModels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import { registerEmail } from "../services/emailServices.js";

dotenv.config();

const registerUser = async (req, res)=>{
    try {
        const {name,email,password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({message:"please fill all the details"});
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"user already exists"});

        }

        const hashedpassword = await bcrypt.hash(password, 10);

        const newUser  = new User({
            name,
            email,
            password: hashedpassword
        });

        await newUser.save();

        await registerEmail(name, email);

        return res.status(201).json({message:"user registered successfully",
            success: true
        });
    } catch (error) {
        console.log("error in user registration is :", error);
        console.log("error in register user is :", error);
    }
};

const loginUser = async (req,res)=>{
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({message:"please fill all the details"});
        }

        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"user dont exist"});

        }

        const isPasswordValid  = await bcrypt.compare(password, user.password );
        if(!isPasswordValid){
            return res.status(400).json({message:"invalid credentials"});
        }

        const token = jwt.sign({ id: user._id,email:user.email, name:user.name}, process.env.JWT_SECRET, {expiresIn: '1d'});

        return res.status(200).json({message:"login successful",
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
            },
            token: token
        });
    } catch (error) {
        console.log("error in user login is :", error);
    }
};


const getAllUsers = async (req,res)=>{
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.log("error in getting all users is :", error);
    }
}

export {registerUser, loginUser, getAllUsers};