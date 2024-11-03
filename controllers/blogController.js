import BlogPost from "../models/blogModal.js";
import slugify from "slugify";

export const createBlogs = async (req, res) => {
  try {
    const { title, content, excerpt, author, tags, metaTags, status } =
      req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "Blog image is required",
      });
    }

    const image = {
      url: req.file.path,
      altText: req.body.altText || "",
      caption: req.body.caption || "",
    };

    const slug = slugify(title, { lower: true });
    const newPost = new BlogPost({
      title,
      slug,
      content,
      excerpt,
      author,
      tags: tags ? JSON.parse(tags) : [],
      image,
      metaTags: metaTags ? JSON.parse(metaTags) : {},
      status,
    });

    const savedPost = await newPost.save();
    res.status(201).json({
      status: 201,
      data: savedPost,
      message: "Blog post created successfully!",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getBlogPostBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const post = await BlogPost.findOne({ slug });

    if (!post) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    res.status(200).json({
      status: 200,
      data: post,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllBlog = async (req, res) => {
  try {
    const posts = await BlogPost.find({});
    res.json({
      status: 200,
      data: posts,
      message: "Blogs retrieved successfully!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBlogPostById = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.json({
      status: 200,
      data: post,
      message: "Blog post retrieved successfully!",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBlogPost = async (req, res) => {
  try {
    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteBlogPost = async (req, res) => {
  try {
    const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }
    res.json(deletedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
