import { useEffect, useState } from "react";
import { prepareIncomeBarChartData } from "../../utils/helper";

const IncomeOverview = ({ transactions, onAddIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);

  return <div>IncomeOverview</div>;
};

export default IncomeOverview;
