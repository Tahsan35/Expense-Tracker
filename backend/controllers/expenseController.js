import Expense from "../models/Expense.js";
import xlsx from "xlsx";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Add expense source
const addExpense = async (req, res) => {
  const userId = req.user.id;
  try {
    const { icon, category, amount, date } = req.body;

    if (!category || !amount || !date) {
      return res
        .status(400)
        .json({ message: "Please provide source, amount and date" });
    }

    const newExpense = await Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });
    await newExpense.save();
    res.status(200).json(newExpense);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding expense",
      error: error.message,
    });
  }
};

// Get all expense source
const getExpenses = async (req, res) => {
  const userId = req.user.id;
  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.status(200).json(expense);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching expense",
    });
  }
};

// Delete expense
const deleteExpense = async (req, res) => {
  // const userId = req.user.id;
  try {
    await Expense.findOneAndDelete(req.params.id);
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting expense",
    });
  }
};

// Download expense data as Excel
const downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    // Get income data
    const expenses = await Expense.find({ userId }).sort({ date: -1 });

    if (expenses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No expense data found",
      });
    }

    // Format data for Excel
    const workSheetData = expenses.map((expense) => ({
      source: expense.source,
      Amount: expense.amount,
      Date: expense.date,
    }));

    // Create workbook and worksheet
    const workBook = xlsx.utils.book_new();
    const workSheet = xlsx.utils.json_to_sheet(workSheetData);

    // Add worksheet to workbook
    xlsx.utils.book_append_sheet(workBook, workSheet, "expenses");

    // Generate Excel file
    // const excelFileName = `income_report_${Date.now()}.xlsx`;
    // const excelFilePath = path.join(__dirname, "..", "uploads", excelFileName);

    // Write to file
    xlsx.writeFile(workBook, "expense_report.xlsx");

    // Send file to client
    res.download("expense_report.xlsx");
  } catch (error) {
    res.status(500).json({
      message: "Error generating Excel report",
    });
  }
};

export { addExpense, getExpenses, deleteExpense, downloadExpenseExcel };
