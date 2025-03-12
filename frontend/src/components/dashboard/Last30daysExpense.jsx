import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChart from "../Chart/CustomBarChart";

const Last30daysExpense = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setChartData(result);

    return () => {};
  }, [data]);

  return (
    <div className="card col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 30 Days Expenses</h5>
      </div>
      <CustomBarChart data={chartData} />
    </div>
  );
};

Last30daysExpense.propTypes = {
  data: PropTypes.array.isRequired,
};
export default Last30daysExpense;
