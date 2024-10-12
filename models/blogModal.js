import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: String,
    default: "Anonymous",
  },
  tags: [String],
  readMoreLink: String,
});

const BlogPost = mongoose.model("Blogs", blogPostSchema);

export default BlogPost;
