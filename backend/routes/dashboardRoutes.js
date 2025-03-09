import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getDashboardData } from "../controllers/dashboardController.js";

const router = express.Router();

// Define routes for dashboard
router.get("/", protect, getDashboardData);

export default router;
