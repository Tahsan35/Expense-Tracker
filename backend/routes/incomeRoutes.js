import express from "express";
import {
  addIncome,
  getIncomes,
  deleteIncome,
  downloadIncomeExcel,
} from "../controllers/incomeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addIncome);
router.get("/get", protect, getIncomes);
router.get("/downloadExcel", protect, downloadIncomeExcel);
router.delete("/:id", protect, deleteIncome);

// Temporary route for testing
router.get("/test", protect, (req, res) => {
  res.json({ message: "Income routes working" });
});

export default router;
