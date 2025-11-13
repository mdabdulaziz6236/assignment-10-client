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
    const date = new Date(form.date.value);
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

  const InputClasses = 
    "w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 px-4 py-2 rounded-lg text-gray-900 dark:text-gray-200 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 shadow-sm";
  
  const LabelClasses = 
    "block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300";

  return (
    <div 

      className="flex justify-center items-center px-4 py-10 min-h-screen bg-gray-50 dark:bg-gray-900"
    >
      <title>Add Transaction</title>
      <div 
        className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl dark:shadow-indigo-500/15 w-full max-w-lg border border-gray-200 dark:border-gray-700"
      >
        <h2 
          className="text-3xl font-extrabold mb-6 text-center text-indigo-600 dark:text-cyan-400"
        >
          New Transaction
        </h2>

        <form onSubmit={handleAddTransaction} className="space-y-5">
          {/* Type */}
          <div>
            <label className={LabelClasses}>
              Type
            </label>
            <select
              name="type"
              className={InputClasses}
              required
            >
              {/* Option text color needs to be adjusted via parent class */}
              <option value="income" className="text-green-600 dark:text-green-400">Income</option>
              <option value="expense" className="text-red-600 dark:text-red-400">Expense</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className={LabelClasses}>
              Category
            </label>
            <select
              name="category"
              className={InputClasses}
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
            <label className={LabelClasses}>
              Amount
            </label>
            <input
              name="amount"
              placeholder="Enter amount"
              className={InputClasses}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className={LabelClasses}>
              Description
            </label>
            <input
              type="text"
              name="description"
              placeholder="Description"
              className={InputClasses}
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className={LabelClasses}>
              Date
            </label>
            <input
              type="date"
              name="date"
              className={InputClasses}
              required
            />
          </div>

          {/* User info  */}
          <div>
            <label className={LabelClasses}>
              Name (Read-only)
            </label>
            <input
              type="text"
              value={user?.displayName || "Loading..."}
              readOnly
              className={`w-full border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50`}
            />
          </div>
          <div>
            <label className={LabelClasses}>
              Email (Read-only)
            </label>
            <input
              type="email"
              value={user?.email || "Loading..."}
              readOnly
              className={`w-full border border-gray-300 dark:border-gray-700 px-4 py-2 rounded-lg text-gray-700 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/50`}
            />
          </div>

          {/* Submit Button  */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-extrabold transition duration-150 
                      bg-indigo-600 dark:bg-cyan-500 text-white dark:text-gray-900 

                      ${loading ? 'opacity-70 cursor-not-allowed' : 'shadow-lg  '}`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                Adding...
              </span>
            ) : (
              "Add Transaction"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTransaction;