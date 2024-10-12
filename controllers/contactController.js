import Contact from "../models/contactModal.js";

export const createContact = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      companyName,
      budget,
      projectDescription,
    } = req.body;

    const newContact = new Contact({
      firstName,
      lastName,
      email,
      phoneNumber,
      companyName,
      budget,
      projectDescription,
    });

    const savedContact = await newContact.save();
    res.status(201).json({
      message: "Contact created successfully",
      contact: savedContact,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
