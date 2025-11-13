import React, { use } from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import { Toaster } from "react-hot-toast";
import { AuthContext } from "../Context/AuthContext";
import Loading from "../Pages/Loading/Loading";

const MainLayout = () => {
  const { loading } = use(AuthContext);
  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div className="">
      <Navbar></Navbar>
      <div className="dark:bg-gray-900 bg-gray-50">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
      <Toaster position="top-right"></Toaster>
    </div>
  );
};

export default MainLayout;
