import BlogPost from "../models/blogModal.js";

export const createBlog = async (req, res) => {
  try {
    const {
      title,
      content,
      excerpt,
      author,
      tags,
      featuredImage,
      images,
      internalLinks,
      metaTags,
      status,
    } = req.body;

    // Validate featuredImage structure if provided
    if (featuredImage && (!featuredImage.url || !featuredImage.position)) {
      return res.status(400).json({
        message: "Featured image must include url and position",
      });
    }

    // Validate images array if provided
    if (images && !images.every((img) => img.url && img.position)) {
      return res.status(400).json({
        message: "All images must include url and position",
      });
    }

    const slug = slugify(title, { lower: true });
    console.log(slug, "slug");
    const newPost = new BlogPost({
      title,
      slug,
      content,
      excerpt,
      author,
      tags,
      featuredImage,
      images,
      internalLinks,
      metaTags,
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

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Get additional image metadata from request body
    const { altText, caption, position } = req.body;

    const imageData = {
      url: req.file.path,
      altText: altText || "",
      caption: caption || "",
      position: position || "inline", // default to inline if not specified
    };

    res.status(200).json({
      ...imageData,
      message: "Image uploaded successfully",
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
