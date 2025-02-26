require("dotenv").config();
import express from "express";
import cors from "cors";
import path from "path";

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

const port = process.env.PORT || 5000; // You can change this port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
