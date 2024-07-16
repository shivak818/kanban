import pkg from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import tasksRoutes from "./routes/tasks.js";
import usersRoutes from "./routes/users.js";

dotenv.config(); // Load environment variables from .env file

const { json } = pkg;
const app = express();

// Middleware
app.use(json());
app.use(cors());

// DB Config
mongoose.connect(process.env.MONGODB_URI, {});

// Routes
app.use("/api/tasks", tasksRoutes);
app.use("/api/users", usersRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server started on port ${port}`));
export default app;
