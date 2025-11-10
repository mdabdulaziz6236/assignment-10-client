import React, { useState,  use } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";
import { AuthContext } from "../../Context/AuthContext";

const UpdateTransaction = () => {
  const { user } = use(AuthContext)
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation()
  
  const [transaction, setTransaction] = useState(location.state?.transaction || null);
  const [loading, setLoading] = useState(false);
  const handleChange = e => {
    const { name, value } = e.target;
    setTransaction(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const changedData = {
        type: e.target.type.value,
        category: e.target.category.value,
        amount:Number(e.target.amount.value),
        description:e.target.description.value,
        date: e.target.date.value,
    }

    setLoading(true)
    fetch(`http://localhost:3000/transaction/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(changedData),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === "Transaction updated successfully") {
            setLoading(false)
          Swal.fire("Success!", "Transaction has been updated.", "success");
          navigate(`/transactionDetails/${id}`);
        }
      })
      .catch(err => {Swal.fire("Error!", err.message, "error"),setLoading(false)});
  };

  if (loading) return <Loading />;

  if (!transaction) return <p className="text-center mt-10">Transaction not found.</p>;

  return (
    <div className="min-h-screen flex justify-center items-center px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className=" shadow-lg rounded-lg p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
          Update Transaction
        </h2>

        <label className="block mb-2 font-semibold">Type</label>
        <select
          name="type"
          value={transaction.type}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        >
          <option value="income">Income</option>
          <option value="expanse">Expense</option>
        </select>

        <label className="block mb-2 font-semibold">Category</label>
        <input
          type="text"
          name="category"
          value={transaction.category}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <label className="block mb-2 font-semibold">Amount</label>
        <input
          type="number"
          name="amount"
          value={transaction.amount}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
          required
        />

        <label className="block mb-2 font-semibold">Description</label>
        <textarea
          name="description"
          value={transaction.description}
          onChange={handleChange}
          className="w-full mb-4 p-2 border rounded"
        />

        <label className="block mb-2 font-semibold">Date</label>
        <input
          type="date"
          name="date"
          value={(transaction.date)}
          onChange={handleChange}
          className="w-full mb-6 p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
        >
          Update Transaction
        </button>
      </form>
    </div>
  );
};

export default UpdateTransaction;
