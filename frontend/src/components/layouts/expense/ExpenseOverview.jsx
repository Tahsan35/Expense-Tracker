import React, { useEffect, useState } from "react";
import { prepareExpenseLineChartData } from "../../../utils/helper";

const ExpenseOverview = ({ transactions, onAddExpense }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseLineChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);

  return (
    <div>
      <div>
        <div>
          <h5>Expense Overview</h5>
          <p>Track your spending trends over time </p>
        </div>
        <button onClick={onAddExpense}></button>
      </div>
    </div>
  );
};

export default ExpenseOverview;
