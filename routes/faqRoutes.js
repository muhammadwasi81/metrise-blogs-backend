import express from "express";
import { createDreamProject } from "../controllers/faqController.js";

const router = express.Router();

router.post("/create-dream-project", createDreamProject);

export default router;
