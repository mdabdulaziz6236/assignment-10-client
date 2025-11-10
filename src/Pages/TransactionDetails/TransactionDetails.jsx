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
    fetch(`http://localhost:3000/transaction/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
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
    <div className="container mx-auto my-12  ">
      <div className="max-w-2xl mx-auto bg-base-100 shadow-lg rounded-2xl overflow-hidden border border-base-200">
        {/* Header */}
        <div
          className={`p-5  ${
            transaction.type === "income" ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          <h2 className="text-3xl font-bold capitalize">{transaction.type}</h2>
          <p className="text-lg capitalize opacity-90">
            {transaction.category}
          </p>
        </div>

        {/* Details */}
        <div className="p-6 space-y-5">
          <p className="text-gray-700 text-lg">
            <strong>Description:</strong>{" "}
            {transaction.description || "No description"}
          </p>
          <hr />

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className=" text-xl text-gray-500">Amount</p>
              <p
                className={`text-2xl font-bold ${
                  transaction.type === "income"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {transaction.amount}
              </p>
            </div>
            <div>
              <p className="text-xl text-gray-500">Date</p>
              <p className="text-xl font-semibold text-gray-800">
                {transaction.date}
              </p>
            </div>
          </div>

          <hr />

          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-xl text-gray-500">
              Total {transaction.type === "income" ? "Income" : "Expense"} for "
              {transaction.category}" category
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {categoryTotal} Taka
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
