import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import Home from "./pages/Dashboard/Home";
import UserProvider from "./context/userContext";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<SignUp />} />
          <Route path="/dashboard" exact element={<Home />} />
          <Route path="/income" exact element={<Income />} />
          <Route path="/expense" exact element={<Expense />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        toastOptions={{
          className: "toast",
          duration: 4000,
          style: { fontSize: "14px" },
        }}
      />
    </UserProvider>
  );
};

export default App;

const Root = () => {
  //check if user is logged in and have token in local storage
  const isAuthenticated = !!localStorage.getItem("token");

  // redirect to dashboard if authenticated,otherwise redirect to login
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};
