import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Register from "../Pages/Auth/Register";
import Login from "../Pages/Auth/Login";
import ResetPassword from "../Pages/Auth/ResetPassword";
import Profile from "../Pages/Profile/Profile";
import UpdateProfile from "../Pages/Profile/UpdateProfile";
import AddTransaction from "../Pages/AddTransaction/AddTransaction";
import MyTransactions from "../Pages/MyTransactions/MyTransactions";
import Reports from "../Pages/Reports/Reports";
import TransactionDetails from "../Pages/TransactionDetails/TransactionDetails";
import UpdateTransaction from "../Pages/UpdateTransaction/UpdateTransaction";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/resetPassword",
        Component: ResetPassword,
      },
      {
        path: "/profile",
        Component: Profile,
      },
      {
        path: "/update-profile",
        Component: UpdateProfile,
      },
      {
        path: "/add-transaction",
        Component: AddTransaction,
      },
      {
        path: "/my-transaction",
        Component: MyTransactions,
      },
      {
        path: "/reports",
        Component: Reports,
      },
      {
        path: "/transactionDetails/:id",
        Component: TransactionDetails,
      },
      {
        path: "/transaction/update/:id",
        Component: UpdateTransaction,
      },
    ],
  },
]);
