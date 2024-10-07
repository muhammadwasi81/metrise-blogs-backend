import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import bodyParser from "body-parser";
import cors from "cors";
import blogRoutes from "./routes/blogRoutes.js";

dotenv.config();
const port = process.env.PORT || 8000;

connectDB();

const app = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/blogs", blogRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () =>
  console.log(`Server started on port ${port}`.yellow.bold)
);
