import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import InfoCard from "../../components/Cards/InfoCard";

import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { addThousandsSeparator } from "../../utils/helper";
import RecentTransactions from "../../components/dashboard/RecentTransactions";

const Home = () => {
  useUserAuth();

  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DASHBOARD_DATA}`
      );
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("something went wrong.plz try again later", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);
  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMdCard />}
            label="Total Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
            onClick={() => navigate("/products")}
          />
          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
            color="bg-orange-500"
            onClick={() => navigate("/products")}
          />
          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
            color="bg-red-500"
            onClick={() => navigate("/products")}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate("/expense")}
          ></RecentTransactions>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
