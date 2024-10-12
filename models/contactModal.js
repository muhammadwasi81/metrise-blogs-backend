import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter your first name"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Please enter your last name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your email address"],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Please enter your phone number"],
    trim: true,
  },
  companyName: {
    type: String,
    trim: true,
  },
  budget: {
    type: String,
    trim: true,
  },
  projectDescription: {
    type: String,
    required: [true, "Please enter a project description"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
