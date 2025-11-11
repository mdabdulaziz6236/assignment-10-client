import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Loading from "../Loading/Loading";

const TransactionDetails = () => {
  const { id } = useParams();
  const { user } = use(AuthContext);

  const [transaction, setTransaction] = useState(null);
  const [categoryTotal, setCategoryTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      return;
    }
    setLoading(true);
    fetch(
      `https://assignment-10-server-kappa-one.vercel.app/transaction/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTransaction(data.transaction);
        setCategoryTotal(data.categoryTotal);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching transaction details:", err);
        setLoading(false);
      });
  }, [id, user]);
  if (loading) return <Loading />;
  if (!transaction)
    return (
      <div className="text-center my-10 text-gray-500">
        Transaction not found.
      </div>
    );
  return (
    <div className="container mx-auto py-12">
      <div className="max-w-2xl mx-auto bg-gray-900/90 shadow-2xl rounded-2xl overflow-hidden border border-gray-800 backdrop-blur-lg">
        {/* Header */}
        <div
          className={`p-6 ${
            transaction.type === "income"
              ? "bg-linear-to-r from-green-500 to-emerald-600"
              : "bg-linear-to-r from-red-500 to-rose-600"
          } text-white`}
        >
          <h2 className="text-3xl font-extrabold capitalize drop-shadow-lg">
            {transaction.type}
          </h2>
          <p className="text-lg capitalize opacity-90">
            {transaction.category}
          </p>
        </div>

        {/* Details */}
        <div className="p-8 space-y-6">
          <p className="text-gray-300 text-lg">
            <strong className="text-indigo-400">Description:</strong>{" "}
            {transaction.description || "No description"}
          </p>
          <hr className="border-gray-700" />

          <div className="grid grid-cols-2 gap-6">
            <div className="text-center bg-gray-800/60 p-4 rounded-xl border border-gray-700 hover:border-indigo-500 transition">
              <p className="text-lg text-gray-400">Amount</p>
              <p
                className={`text-2xl font-bold ${
                  transaction.type === "income"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {transaction.amount}৳
              </p>
            </div>

            <div className="text-center bg-gray-800/60 p-4 rounded-xl border border-gray-700 hover:border-pink-500 transition">
              <p className="text-lg text-gray-400">Date</p>
              <p className="text-xl font-semibold text-gray-100">
                {transaction.date}
              </p>
            </div>
          </div>

          <hr className="border-gray-700" />

          <div className="bg-linear-to-r from-indigo-900/60 via-gray-900/70 to-purple-900/60 p-6 rounded-xl border border-gray-700">
            <p className="text-lg text-gray-300">
              Total{" "}
              <span
                className={`font-semibold ${
                  transaction.type === "income"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {transaction.type === "income" ? "Income" : "Expense"}
              </span>{" "}
              for{" "}
              <span className="text-indigo-400 font-semibold">
                "{transaction.category}"
              </span>{" "}
              category
            </p>
            <p className="text-3xl font-extrabold text-white mt-2 tracking-wide">
              {categoryTotal} Taka
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
