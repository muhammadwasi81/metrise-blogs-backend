import express from "express";
import {
  createBlog,
  getAllBlog,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
  uploadImage,
} from "../controllers/blogController.js";
import { upload } from "../config/cloudinaryConfig.js";
const router = express.Router();

router.post("/create-blog", createBlog);
router.post("/upload-image", upload.single("image"), uploadImage);
router.get("/get-blogs", getAllBlog);
router.get("/get-blog/:id", getBlogPostById);
router.put("/update-blog/:id", updateBlogPost);
router.delete("/delete-blog/:id", deleteBlogPost);

export default router;
