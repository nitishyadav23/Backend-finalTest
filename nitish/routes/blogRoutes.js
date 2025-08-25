import express from "express";
import {createBlog,getAllBlogs,getBlogById,uploadMiddleware}from"../controllers/blogController.js";
import {protect}from"../middleware/authMiddleware.js";

const router = express.Router();
router.post("/", protect, uploadMiddleware, createBlog);
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);

export default router;
