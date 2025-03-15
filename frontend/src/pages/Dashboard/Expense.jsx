import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useUserAuth } from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import ExpenseOverview from "../../components/layouts/expense/ExpenseOverview";

const Expense = () => {
  useUserAuth();

  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(true);
  const [expenseData, setExpenseData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  //Get all expense  details
  const fetchExpenseDetails = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_EXPENSE}`
      );
      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.log("something went wrong.plz try again later", error);
    } finally {
      setIsLoading(false);
    }
  };

  //handle add Income
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    //validation check
    if (!category.trim()) {
      toast.error("Category must be required");
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
      await axiosInstance.post(`${API_PATHS.EXPENSE.ADD_EXPENSE}`, {
        category,
        amount,
        date,
        icon,
      });
      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.log(
        "Error add income",
        error.message || error.response?.data?.message
      );
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
  }, []);
  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onAddExpense={() => setOpenAddExpenseModal(true)}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
