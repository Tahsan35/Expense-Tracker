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

// Get all incomes for a user
const getIncomes = async (req, res) => {
  try {
    // Get query parameters for filtering
    const { startDate, endDate, category } = req.query;

    // Build filter object
    const filter = { user: req.user._id };

    // Add date range filter if provided
    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // Add category filter if provided
    if (category) {
      filter.category = category;
    }

    const incomes = await Income.find(filter).sort({ date: -1 });

    // Calculate total amount
    const totalAmount = incomes.reduce((acc, income) => acc + income.amount, 0);

    res.status(200).json({
      success: true,
      count: incomes.length,
      totalAmount,
      data: incomes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching incomes",
      error: error.message,
    });
  }
};

// Delete income
const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!income) {
      return res.status(404).json({
        success: false,
        message: "Income not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Income deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting income",
      error: error.message,
    });
  }
};

// Download income data as Excel
const downloadIncomeExcel = async (req, res) => {
  try {
    // Get query parameters for filtering
    const { startDate, endDate, category } = req.query;

    // Build filter object
    const filter = { user: req.user._id };

    // Add date range filter if provided
    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // Add category filter if provided
    if (category) {
      filter.category = category;
    }

    // Get income data
    const incomes = await Income.find(filter).sort({ date: -1 });

    if (incomes.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No income data found",
      });
    }

    // Format data for Excel
    const workSheetData = incomes.map((income) => {
      return {
        Title: income.title,
        Amount: income.amount,
        Category: income.category,
        Description: income.description || "N/A",
        Date: new Date(income.date).toLocaleDateString(),
      };
    });

    // Create workbook and worksheet
    const workBook = xlsx.utils.book_new();
    const workSheet = xlsx.utils.json_to_sheet(workSheetData);

    // Add worksheet to workbook
    xlsx.utils.book_append_sheet(workBook, workSheet, "Incomes");

    // Generate Excel file
    const excelFileName = `income_report_${Date.now()}.xlsx`;
    const excelFilePath = path.join(__dirname, "..", "uploads", excelFileName);

    // Write to file
    xlsx.writeFile(workBook, excelFilePath);

    // Send file to client
    res.download(excelFilePath, excelFileName, (err) => {
      if (err) {
        res.status(500).json({
          success: false,
          message: "Error downloading file",
          error: err.message,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error generating Excel report",
      error: error.message,
    });
  }
};

export { addIncome, getIncomes, deleteIncome, downloadIncomeExcel };
