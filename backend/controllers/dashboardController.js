import Income from "../models/Income";
import Expense from "../models/Expense";
import { isValidObjectId, Types } from "mongoose";

//dashboard data
const getDashboardData = async (req, res) => {
    try{
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId));

    //fetch total income and expense
    const totalIncome=await Income.aggregate([
        {$match:{userId:userObjectId}},
        {$group:{_id:null,total:{$sum:"$amount"}}}
    ]);
console.log()


const totalExpense=await Expense.aggregate([
 {$match:{userId:userObjectId}},
        {$group:{_id:null,total:{$sum:"$amount"}}}
]);

//get income transactions in the last 60 days
const last60daysIncomeTransactions=await Income.find({
    userId,date:{$gte:new Date(Date.now()-60*24*60*100)},
}).sort({date:-1});

//get total income for last 60days
const incomeLast60days=last60daysIncomeTransactions.reduce((sum,transaction)=>sum+transaction.amount,0
):

//Get expense transactions in the last 30 days
    }

