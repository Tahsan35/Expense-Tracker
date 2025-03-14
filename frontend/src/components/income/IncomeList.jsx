import moment from "moment";

import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const IncomeList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income Source</h5>
        <button className="card-btn" onClick={onDownload}>
          <LuDownload className="text-base" />
          Download
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions.map((transaction) => (
          <TransactionInfoCard
            key={transaction._id}
            title={transaction.source}
            icon={transaction.icon}
            date={moment(transaction.date).format("DD MMM, YYYY")}
            amount={transaction.amount}
            type={"income"}
            onDelete={() => onDelete(transaction._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default IncomeList;
