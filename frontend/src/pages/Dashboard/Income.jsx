import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/income/IncomeOverview";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import Modal from "../../components/Modal";
import AddIncomeForm from "../../components/income/AddIncomeForm";
import toast from "react-hot-toast";
import IncomeList from "../../components/income/IncomeList";
import DeleteAlert from "../../components/DeleteAlert";
import { useUserAuth } from "../../hooks/useUserAuth";

const Income = () => {
  useUserAuth();
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(true);
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
  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    //validation check
    if (!source.trim()) {
      toast.error("source must be required");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("amount must be valid number greater than 0");
      return;
    }
    if (!date) {
      toast.error("date must be required");
      return;
    }
    try {
      await axiosInstance.post(`${API_PATHS.INCOME.ADD_INCOME}`, {
        source,
        amount,
        date,
        icon,
      });
      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.log(
        "Error add income",
        error.message || error.response?.data?.message
      );
    }
  };

  // delete income
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(`${API_PATHS.INCOME.DELETE_INCOME}/${id}`);
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income deleted successfully");
      fetchIncomeDetails();
    } catch (error) {
      console.log(
        "Error delete income",
        error.message || error.response?.data?.message
      );
    }
  };

  //handle download income details
  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
        { responseType: "blob" }
      );
      //create url for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Error download income details", error);
      toast.error("Something went wrong.please try again later");
    }
  };

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
          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({
                show: true,
                data: id,
              });
              onDownload = { handleDownloadIncomeDetails };
            }}
          />
        </div>
        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure want to delete this income "
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Income;
