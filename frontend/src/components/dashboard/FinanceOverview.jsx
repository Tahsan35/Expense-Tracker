import CustomPieChart from "../Chart/CustomPieChart";

const COLORS = ["#875CF5", "#FA2C37", "#FF6900"];
const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Income", amount: totalIncome },
    { name: "Total Expense", amount: totalExpense },
  ];

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5>Financial Overview</h5>
      </div>
      <CustomPieChart
        data={balanceData}
        label="total Balance"
        totalAmount={`$${totalBalance}`}
        colors={COLORS}
        showTextAnchor
      ></CustomPieChart>
    </div>
  );
};

export default FinanceOverview;
