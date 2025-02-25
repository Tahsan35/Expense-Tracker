import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get("/", (req, res) => {
  res.send("Expense Tracker API is running");
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
