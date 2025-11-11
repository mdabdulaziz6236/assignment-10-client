import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../Context/AuthContext";

const AddTransaction = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleAddTransaction = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const type = form.type.value;
    const category = form.category.value;
    const amount = parseFloat(form.amount.value);
    const description = form.description.value;
    const date = form.date.value;
    const name = user?.displayName;
    const email = user?.email;

    const transaction = {
      type,
      category,
      amount,
      description,
      date,
      name,
      email,
    };

    fetch("https://assignment-10-server-kappa-one.vercel.app/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(transaction),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success(" Transaction added successfully!");
          form.reset();
        } else {
          toast.error(" Failed to add transaction!");
        }
      })
      .catch(() => {
        toast.error(" Something went wrong!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex justify-center items-center px-4 py-10 bg-gray-800 min-h-screen">
      <div className="bg-gray-900 p-6 rounded-2xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-indigo-400">
          Add Transaction
        </h2>

        <form onSubmit={handleAddTransaction} className="space-y-4">
          {/* Type */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Type
            </label>
            <select
              name="type"
              className="w-full border border-gray-700 bg-gray-800 px-3 py-2 rounded-md text-gray-200"
              required
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Category
            </label>
            <select
              name="category"
              className="w-full border border-gray-700 bg-gray-800 px-3 py-2 rounded-md text-gray-200"
              required
            >
              <option value="salary">Salary</option>
              <option value="food">Food</option>
              <option value="home">Home</option>
              <option value="transport">Transport</option>
              <option value="shopping">Shopping</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              className="w-full border border-gray-700 bg-gray-800 px-3 py-2 rounded-md text-gray-200"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Description
            </label>
            <input
              type="text"
              name="description"
              placeholder="Enter description"
              className="w-full border border-gray-700 bg-gray-800 px-3 py-2 rounded-md text-gray-200"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Date
            </label>
            <input
              type="date"
              name="date"
              className="w-full border border-gray-700 bg-gray-800 px-3 py-2 rounded-md text-gray-200"
              required
            />
          </div>

          {/* User info */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Name
            </label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="w-full border border-gray-700 px-3 py-2 rounded-md bg-gray-800 text-gray-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-300">
              Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              readOnly
              className="w-full border border-gray-700 px-3 py-2 rounded-md bg-gray-800 text-gray-200"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-400 text-gray-900 py-2 rounded-md font-semibold hover:bg-indigo-500 transition"
          >
            {loading ? "Adding..." : "Add Transaction"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
