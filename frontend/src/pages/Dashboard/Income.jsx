import { useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/income/IncomeOverview";
import { data } from "react-router-dom";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";

const Income = () => {
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  //Get all income details
  const fetchIncomeDetails = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
    GET_INCOME: "/api/v1/income/get",
        `${API_PATHS.INCOME.GET_INCOME}`
      );
      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("something went wrong.plz try again later", error);
    } finally {
      setIsLoading(false);
    }
  };

  //handle add Income
  const handleAddIncome = async (income) => {};

  // delete income
  const deleteIncome = async (id) => {};

  //handle download income details
  const handleDownloadIncomeDetails = async () => {};

  useEffect(() => {
    fetchIncomeDetails();
  }, []);
  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Income;
