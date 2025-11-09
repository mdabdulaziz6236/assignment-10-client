import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return <div className="max-w-11/12 mx-auto">

    <Navbar></Navbar>
    <div className="min-h-screen">
        <Outlet></Outlet>
    </div>
    <Footer></Footer>
    <Toaster position="top-right"></Toaster>
  </div>;
};

export default MainLayout;
