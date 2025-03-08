import express from "express";
import {
  addExpense,
  getExpenses,
  deleteExpense,
  downloadExpenseExcel,
} from "../controllers/expenseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/get", protect, getExpenses);
router.get("/downloadExcel", protect, deleteExpense);
router.delete("/:id", protect, downloadExpenseExcel);

// Temporary route for testing
router.get("/test", protect, (req, res) => {
  res.json({ message: "Income routes working" });
});

export default router;
