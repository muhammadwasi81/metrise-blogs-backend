import BlogPost from "../models/blogModal.js";

export const createBlogs = async (req, res) => {
  try {
    const {
      title,
      content,
      excerpt,
      author,
      tags,
      metaTags,
      status,
      slug,
      previewText,
    } = req.body;

    if (!slug) {
      return res.status(400).json({
        message: "Slug is required",
      });
    }
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

    const newPost = new BlogPost({
      title,
      slug,
      content,
      excerpt,
      author,
      previewText,
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
    const postId = req.params.id;
    const post = await BlogPost.findById(postId);
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
    const updates = { ...req.body };
    const postId = req.params.id;

    const existingPost = await BlogPost.findById(postId);
    if (!existingPost) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    if (updates.slug && updates.slug !== existingPost.slug) {
      const slugExists = await BlogPost.findOne({
        slug: updates.slug,
        _id: { $ne: postId },
      });
      if (slugExists) {
        return res.status(400).json({
          message: "A blog post with this slug already exists",
        });
      }
    }

    if (req.file) {
      updates.image = {
        url: req.file.path,
        altText: req.body.altText || "",
        caption: req.body.caption || "",
      };
    }

    try {
      if (typeof updates.metaTags === "string") {
        updates.metaTags = JSON.parse(updates.metaTags);
      }
      if (typeof updates.tags === "string") {
        updates.tags = JSON.parse(updates.tags);
      }
    } catch (parseError) {
      return res.status(400).json({
        message: "Invalid JSON format for tags or metaTags",
      });
    }

    const updatedPost = await BlogPost.findByIdAndUpdate(postId, updates, {
      new: true,
      runValidators: true,
    });

    res.json({
      status: 200,
      data: updatedPost,
      message: "Blog post updated successfully!",
    });
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
