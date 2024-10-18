import mongoose from "mongoose";

const keyPointSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const subHeadingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  keyPoints: [keyPointSchema],
});

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
  subHeadings: [subHeadingSchema],
});

const BlogPost = mongoose.model("Blogs", blogPostSchema);

export default BlogPost;
