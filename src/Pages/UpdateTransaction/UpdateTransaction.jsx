import React, { useState, use } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";
import { AuthContext } from "../../Context/AuthContext";

const UpdateTransaction = () => {
  const { user } = use(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [transaction, setTransaction] = useState(
    location.state?.transaction || null
  );
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const changedData = {
      type: e.target.type.value,
      category: e.target.category.value,
      amount: Number(e.target.amount.value),
      description: e.target.description.value,
      date: e.target.date.value,
    };

    setLoading(true);
    fetch(
      `https://assignment-10-server-kappa-one.vercel.app/transaction/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify(changedData),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Transaction updated successfully") {
          setLoading(false);
          Swal.fire("Success!", "Transaction has been updated.", "success");
          navigate(`/transactionDetails/${id}`);
        }
      })
      .catch((err) => {
        Swal.fire("Error!", err.message, "error"), setLoading(false);
      });
  };

  if (loading) return <Loading />;

  if (!transaction)
    return <p className="text-center mt-10">Transaction not found.</p>;

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-10 bg-linear-to-r from-gray-900 via-gray-800 to-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900/80 shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-800 backdrop-blur-lg"
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Update Transaction
        </h2>

        {/* Type */}
        <label className="block mb-2 font-semibold text-indigo-300">Type</label>
        <select
          name="type"
          value={transaction.type}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-lg bg-gray-800 text-gray-100 border border-indigo-500/30 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          required
        >
          <option value="income"> Income</option>
          <option value="expense"> Expense</option>
        </select>

        {/* Category */}
        <label className="block mb-2 font-semibold text-pink-300">
          Category
        </label>
        <input
          type="text"
          name="category"
          value={transaction.category}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-lg bg-gray-800 text-gray-100 border border-pink-500/30 focus:ring-2 focus:ring-pink-500 focus:outline-none"
          required
        />

        {/* Amount */}
        <label className="block mb-2 font-semibold text-green-300">
          Amount
        </label>
        <input
          type="number"
          name="amount"
          value={transaction.amount}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-lg bg-gray-800 text-gray-100 border border-green-500/30 focus:ring-2 focus:ring-green-500 focus:outline-none"
          required
        />

        {/* Description */}
        <label className="block mb-2 font-semibold text-yellow-300">
          Description
        </label>
        <textarea
          name="description"
          value={transaction.description}
          onChange={handleChange}
          className="w-full mb-4 p-3 rounded-lg bg-gray-800 text-gray-100 border border-yellow-500/30 focus:ring-2 focus:ring-yellow-500 focus:outline-none"
          placeholder="Write a short note..."
        />

        {/* Date */}
        <label className="block mb-2 font-semibold text-cyan-300">Date</label>
        <input
          type="date"
          name="date"
          value={transaction.date}
          onChange={handleChange}
          className="w-full mb-6 p-3 rounded-lg bg-gray-800 text-gray-100 border border-cyan-500/30 focus:ring-2 focus:ring-cyan-500 focus:outline-none"
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-indigo-500/30"
        >
          Update Transaction
        </button>
      </form>
    </div>
  );
};

export default UpdateTransaction;
