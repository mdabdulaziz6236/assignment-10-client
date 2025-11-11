import React, { useState, useEffect, useContext } from "react";
import {
  FaArrowCircleUp,
  FaArrowCircleDown,
  FaChartLine,
} from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router";

const FinancialOverview = () => {
  const { user } = useContext(AuthContext);
  const [overviewData, setOverviewData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    totalBalance: 0,
  });
  useEffect(() => {
    if (user && user.accessToken) {
      fetch("https://assignment-10-server-kappa-one.vercel.app/totalOverview", {
        method: "GET",
        headers: {
          authorization: `Bearer ${user.accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data) {
            setOverviewData(data);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch overview", err);
        });
    }
  }, [user]);

  return (
    <section className="py-20 px-4 bg-gray-900 text-gray-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          Your Financial Snapshot
        </h2>
        <p className="text-center text-lg mb-12 text-gray-400">
          Here's your real-time financial overview.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {!user ? (
            <>
              <div></div>
              <Link
                to="/login"
                className="bg-gray-800/90 p-6 rounded-2xl shadow-lg border border-gray-700 flex flex-col items-center justify-center hover:bg-gray-700 transition"
              >
                <FaChartLine className="text-3xl text-indigo-400 mb-3" />
                <p className="text-lg font-medium text-gray-300 text-center">
                  Please log in to see your financial overview
                </p>
                <p className="mt-2 text-indigo-400 font-semibold">
                  Click here to login
                </p>
              </Link>
              <div></div>
            </>
          ) : (
            <>
              {/* Total Balance */}
              <div className="bg-gray-800/90 p-6 rounded-2xl shadow-lg border border-gray-700">
                <FaChartLine className="text-3xl text-indigo-400 mb-3" />
                <p className="text-lg font-medium text-gray-300">
                  Total Balance
                </p>
                <p className="text-4xl font-extrabold mt-1 text-white">
                  {overviewData.totalBalance}
                </p>
              </div>

              {/* Total Income */}
              <div className="bg-gray-800/90 p-6 rounded-2xl shadow-lg border border-gray-700">
                <FaArrowCircleUp className="text-3xl text-green-400 mb-3" />
                <p className="text-lg font-medium text-gray-300">
                  Total Income
                </p>
                <p className="text-4xl font-extrabold mt-1 text-green-400">
                  {overviewData.totalIncome}
                </p>
              </div>

              {/* Total Expenses */}
              <div className="bg-gray-800/90 p-6 rounded-2xl shadow-lg border border-gray-700">
                <FaArrowCircleDown className="text-3xl text-red-400 mb-3" />
                <p className="text-lg font-medium text-gray-300">
                  Total Expenses
                </p>
                <p className="text-4xl font-extrabold mt-1 text-red-400">
                  {overviewData.totalExpense}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default FinancialOverview;
