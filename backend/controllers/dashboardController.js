import Income from "../models/Income.js";
import Expense from "../models/Expense.js";
import { isValidObjectId, Types } from "mongoose";

//dashboard data
const getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    //fetch total income and expense
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    //get income transactions in the last 60 days
    const last60daysIncomeTransactions = await Income.find({
      userId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    //get total income for last 60days
    const incomeLast60days = last60daysIncomeTransactions.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    //Get expense transactions in the last 30 days
    const getExpenseTransactionsLast30days = await Expense.find({
      userId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    //get total expense for last 30days
    const expenseLast30days = getExpenseTransactionsLast30days.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    //fetch last 5 transactions(income+expense)
    const last5Transactions = await Promise.all([
      Income.find({ userId }).sort({ date: -1 }).limit(5),
      Expense.find({ userId }).sort({ date: -1 }).limit(5),
    ]).then(([incomeTransactions, expenseTransactions]) => {
      // Combine and sort transactions by date
      const combinedTransactions = [
        ...incomeTransactions,
        ...expenseTransactions,
      ]
        .sort((a, b) => b.date - a.date)
        .slice(0, 5);

      return combinedTransactions;
    });

    // Send response
    res.status(200).json({
      success: true,
      data: {
        totalIncome: totalIncome[0]?.total || 0,
        totalExpense: totalExpense[0]?.total || 0,
        balance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
        incomeLast60days,
        expenseLast30days,
        last60daysIncomeTransactions,
        getExpenseTransactionsLast30days,
        last5Transactions,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export { getDashboardData };
