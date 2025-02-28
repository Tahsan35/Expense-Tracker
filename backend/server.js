import "dotenv/config";
import express from "express";
import cors from "cors";
//import path from "path";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

//middleware to handle cors
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
// Connect to database
try {
  await connectDB();
} catch (error) {
  console.error("Failed to connect to database:", error);
  process.exit(1);
}

//api
app.use("/api/v1/auth", authRoutes);

const port = process.env.PORT || 5000; // You can change this port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
