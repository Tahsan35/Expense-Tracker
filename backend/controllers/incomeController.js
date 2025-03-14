import Income from "../models/Income.js";
import xlsx from "xlsx";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Add new income
const addIncome = async (req, res) => {
  const userId = req.user.id;
  try {
    const { icon, source, amount, date } = req.body;

    if (!source || !amount || !date) {
      return res
        .status(400)
        .json({ message: "Please provide source, amount and date" });
    }

    const newIncome = await Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });
    await newIncome.save();
    res.status(200).json(newIncome);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding income",
      error: error.message,
    });
  }
};

// Get all income source
const getIncomes = async (req, res) => {
  const userId = req.user.id;
  try {
    const income = await Income.find({ userId }).sort({ date: -1 });
    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching incomes",
    });
  }
};

// Delete income
const deleteIncome = async (req, res) => {
  // const userId = req.user.id;
  try {
    await Income.findOneAndDelete(req.params.id);
    res.json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting income",
    });
  }
};

// Download income data as Excel
const downloadIncomeExcel = async (req, res) => {
  const userId = req.user.id;
  try {
    // Get income data
    const incomes = await Income.find({ userId }).sort({ date: -1 });

    if (incomes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No income data found",
      });
    }

    // Format data for Excel
    const workSheetData = incomes.map((income) => ({
      source: income.source,
      Amount: income.amount,
      Date: income.date,
    }));

    // Create workbook and worksheet
    const workBook = xlsx.utils.book_new();
    const workSheet = xlsx.utils.json_to_sheet(workSheetData);

    // Add worksheet to workbook
    xlsx.utils.book_append_sheet(workBook, workSheet, "Incomes");

    // Generate Excel file
    // const excelFileName = `income_report_${Date.now()}.xlsx`;
    // const excelFilePath = path.join(__dirname, "..", "uploads", excelFileName);

    // Write to file
    xlsx.writeFile(workBook, "income_report.xlsx");

    // Send file to client
    res.download("income_report.xlsx");
  } catch (error) {
    res.status(500).json({
      message: "Error generating Excel report",
    });
  }
};

export { addIncome, getIncomes, deleteIncome, downloadIncomeExcel };
