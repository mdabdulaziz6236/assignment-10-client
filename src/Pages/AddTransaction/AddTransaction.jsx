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

    fetch("http://localhost:3000/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization:`Bearer ${user.accessToken}`
      },
      body: JSON.stringify(transaction),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("✅ Transaction added successfully!");
          form.reset();
        } else {
          toast.error("❌ Failed to add transaction!");
        }
      })
      .catch(() => {
        toast.error("⚠️ Something went wrong!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen  flex justify-center items-center px-4 py-10">
      <div className=" p-6 rounded-2xl shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-indigo-600">
          Add Transaction
        </h2>

        <form onSubmit={handleAddTransaction} className="space-y-4">
          {/* Type */}
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <select
              name="type"
              className="w-full border px-3 py-2 rounded-md"
              required
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              className="w-full border px-3 py-2 rounded-md"
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
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input
              type="number"
              name="amount"
              placeholder="Enter amount"
              className="w-full border px-3 py-2 rounded-md"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <input
              type="text"
              name="description"
              placeholder="Enter description"
              className="w-full border px-3 py-2 rounded-md"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              name="date"
              className="w-full border px-3 py-2 rounded-md"
              required
            />
          </div>

          {/* User info */}
          
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="w-full border px-3 py-2 rounded-md bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full border px-3 py-2 rounded-md bg-gray-100"
              />
            </div>
    

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-md font-semibold hover:bg-indigo-700 transition"
          >
            {loading ? "Adding..." : "Add Transaction"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;
