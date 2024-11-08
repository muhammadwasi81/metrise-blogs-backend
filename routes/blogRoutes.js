import express from "express";
import {
  createBlogs,
  getAllBlog,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
  getBlogPostBySlug,
} from "../controllers/blogController.js";
import { upload } from "../config/cloudinaryConfig.js";
const router = express.Router();

router.post("/create-blog", upload.single("image"), createBlogs);
router.get("/get-blogs", getAllBlog);
router.get("/get-blog/:slug", getBlogPostBySlug);
router.get("/get-blog-details/:id", getBlogPostById);
router.put("/update-blog/:id", upload.single("image"), updateBlogPost);
router.delete("/delete-blog/:id", deleteBlogPost);

export default router;
