import mongoose from "mongoose";

const dreamProjectSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please provide your full name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email address"],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
  },
  message: {
    type: String,
    required: [true, "Please provide a message about your project idea"],
    trim: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

const DreamProject = mongoose.model("DreamProject", dreamProjectSchema);

export default DreamProject;
