export const BASE_URL = "http://localhost:8000";

//utils/APIPaths
export const API_PATHS = {
  LOGIN: "/api/v1/auth/login",
  REGISTER: "/api/v1/auth/register",
  GET_USER_INFO: "/api/v1/auth/user",
  DASHBOARD: {
    GET_DASHBOARD_DATA: "/api/v1/dashboard",
  },
  INCOME: {
    GET_INCOME: "/api/v1/income/get",
    ADD_INCOME: "/api/v1/income/add",
    DELETE_INCOME: (incomeId) => `/api/v1/income/${incomeId}`,
    DOWNLOAD_INCOME: "/api/v1/income/downloadExcel",
  },
  EXPENSE: {
    GET_EXPENSE: "/api/v1/expense/get",
    ADD_EXPENSE: "/api/v1/expense/add",
    DELETE_EXPENSE: (expenseId) => `/api/v1/expense/${expenseId}`,
    DOWNLOAD_EXPENSE: "/api/v1/expense/downloadExcel",
  },
  IMAGE: {
    UPLOAD_IMAGE: "/api/v1/auth/upload-image",
  },
};
