import { LuArrowRight } from "react-icons/lu";

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
    </div>
  );
};

export default RecentTransactions;
