import express from "express";
import multer from "multer";
import { createBlog } from "../controllers/blogController.js";
import { verifyToken } from "../middleware/authMiddleware.js";


const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Temporary storage for uploaded files

router.post("/create",verifyToken, upload.single('image'), createBlog);


export default router;