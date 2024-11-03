import express from "express";
import {
  createBlogs,
  getAllBlog,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
} from "../controllers/blogController.js";
import { upload } from "../config/cloudinaryConfig.js";
const router = express.Router();

router.post("/create-blog", upload.single("image"), createBlogs);
router.get("/get-blogs", getAllBlog);
router.get("/get-blog/:id", getBlogPostById);
router.put("/update-blog/:id", updateBlogPost);
router.delete("/delete-blog/:id", deleteBlogPost);

export default router;
