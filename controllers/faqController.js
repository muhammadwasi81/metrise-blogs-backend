import DreamProject from "../models/faqModal.js";

export const createDreamProject = async (req, res) => {
  try {
    const { fullName, email, message } = req.body;

    const newDreamProject = new DreamProject({
      fullName,
      email,
      message,
    });

    const savedDreamProject = await newDreamProject.save();

    res.status(201).json({
      message: "Dream project submission received successfully",
      project: savedDreamProject,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error submitting dream project",
      error: error.message,
    });
  }
};
