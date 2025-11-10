import React, { useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";

const MyTransactions = () => {
  const { user } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      return;
    }
    setLoading(true);
    fetch(`http://localhost:3000/my-transactions?email=${user?.email}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${user?.accessToken}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTransactions(data);
      })
      .catch((err) => {
        toast.error(`${err.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);
  /* handle delete */
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3000/transaction/${id}`, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${user?.accessToken}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.message === "Transaction deleted successfully") {
              setTransactions((prev) => prev.filter((t) => t._id !== id));
              Swal.fire({
                title: "Deleted!",
                text: "Transaction has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((err) => {
            Swal.fire("Error!", err.message, "error");
          });
      }
    });
  };
  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <div className="min-h-screen px-4 py-10 ">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-indigo-600">
          My Transactions
        </h2>

        {transactions.length === 0 ? (
          <div className="text-center text-gray-500 text-lg p-10 bg-white rounded-lg shadow-md">
            <p>You have not added any transactions yet.</p>
            <Link
              to="/add-transaction"
              className="text-indigo-600 hover:underline mt-2 inline-block"
            >
              Add your first transaction
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transactions.map((transaction) => (
              <div
                key={transaction._id}
                className={`bg-white rounded-lg shadow-lg flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-b-4 ${
                  transaction.type === "income"
                    ? "border-green-500"
                    : "border-red-500"
                }`}
              >
                <div className="p-3">
                  <div className="flex justify-between items-center mb-1">
                    <span
                      className={`px-3 py-1 rounded-full capitalize text-sm font-semibold ${
                        transaction.type === "income"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {transaction.type}
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="text-xl font-bold capitalize text-gray-900">
                      {transaction.category}
                    </h3>
                    <p
                      className={`text-2xl font-bold ${
                        transaction.type === "income"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.type === "income" ? "+" : "-"}
                      {transaction.amount}
                    </p>
                  </div>

                  <p
                    className="text-gray-600 text-sm  truncate"
                    title={transaction.description}
                  >
                    {transaction.description || "No description"}
                  </p>
                </div>

                <div className="flex justify-end items-center gap-5 border-t bg-gray-50 px-5 py-1.5 rounded-b-lg">
                  <Link
                    to={`/transactionDetails/${transaction._id}`}
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                    title="View Details"
                  >
                    <FaEye size={18} />
                  </Link>
                  <Link
                    to={`/transaction/update/${transaction._id}`}
                    state={{ transaction }}
                    className="text-yellow-500 hover:text-yellow-700 transition-colors"
                    title="Update"
                  >
                    <FaEdit size={18} />
                  </Link>
                  <button
                    onClick={() => handleDelete(transaction._id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    title="Delete"
                  >
                    <MdDelete size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTransactions;
