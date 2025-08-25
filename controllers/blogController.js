import Blog from "../models/blogModels.js";
import cloudinary from "../config/cloudinary.js";

export const createBlog = async (req,res)=>{
    try {
        const {title, content, image} = req.body;
        if(!req.file){
            return res.status(400).json({message:"please upload the image"});
        }
        const result = await cloudinary.uploader.upload(req.file.path);
            
        const blog = new Blog({
            title,
            content,
            imageURL: result.secure_url,
            authorId: req.user._id,
        });
        await blog.save();
        return res.status(201).json({message:"blog created successfully", blog});
    } catch (error) {
        res.status(500).json({message:"internal server error" , error: error.message});
    }
}