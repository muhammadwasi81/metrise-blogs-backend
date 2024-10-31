import mongoose from "mongoose";

const metaTagSchema = new mongoose.Schema({
  title: String,
  description: String,
  keywords: [String],
  ogImage: String,
  ogTitle: String,
  ogDescription: String,
});

const imageSchema = new mongoose.Schema({
  url: String,
  altText: String,
  caption: String,
  position: String, // inline, featured, gallery
});

const internalLinkSchema = new mongoose.Schema({
  text: String,
  targetPostId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blogs",
  },
  displayText: String,
});

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String, // Rich text editor content in HTML/JSON format
    required: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  featuredImage: imageSchema,
  images: [imageSchema],
  internalLinks: [internalLinkSchema],
  metaTags: metaTagSchema,
  date: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: String,
    default: "Anonymous",
  },
  tags: [String],
  status: {
    type: String,
    enum: ["draft", "published", "archived"],
    default: "draft",
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
});

blogPostSchema.pre("save", function (next) {
  this.lastModified = new Date();
  next();
});

const BlogPost = mongoose.model("Blogs", blogPostSchema);

export default BlogPost;
