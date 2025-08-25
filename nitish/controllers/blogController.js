import Blog from "../models/blog.js";
import cloudinary from "../config/cloudinaryConfig.js";
import multer from "multer";

const upload = multer({ dest: "uploads/" });
export const createBlog = async (req, res) =>{
  try{
    const{title,content} = req.body;
    let imageURL = "";

    if(req.file){
      const result = await cloudinary.uploader.upload(req.file.path);
      imageURL = result.secure_url;
    }

    const blog = await Blog.create({
      title,
      content,
      imageURL,
      authorId: req.user,
    });
    res.status(201).json(blog);
  }
  catch(err){
    res.status(500).json({
        message:"Server error",
        error: err.message
    });
  }
};

export const getAllBlogs = async (req, res) =>{
  try {
    const blogs = await Blog.find().populate("authorId", "name email");
    res.json(blogs);
  }
  catch (err) {
    res.status(500).json({
        message:"Server error",
        error: err.message
    });
  }
};

export const getBlogById = async (req, res) =>{
  try{
    const blog = await Blog.findById(req.params.id).populate("authorId", "name email");
    if (!blog) return res.status(404).json({
        message: "Blog not found"
    });
    res.json(blog);
  }
  catch(err){
    res.status(500).json({
        message:"Server error",
        error:err.message});
  }
};

export const uploadMiddleware = upload.single("image");
