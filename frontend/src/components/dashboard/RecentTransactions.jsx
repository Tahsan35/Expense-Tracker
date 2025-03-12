import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import TransactionInfoCard from "../Cards/TransactionInfoCard";

const RecentTransactions = ({ transactions, onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h4 className="text-lg">Recent Transactions</h4>

        <button className="card-btn" onClick={onSeeMore}>
          See All
          <LuArrowRight className="text-base" />
        </button>
      </div>
      <div className="mt-6">
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.type == "expense" ? item.category : item.source}
            icon={item.icon}
            date={moment(item.date).format("D MM YYYY")}
            amount={item.amount}
            type={item.type}
            hideDeleteBtn
          ></TransactionInfoCard>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
