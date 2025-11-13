import React, { useEffect, useState, use } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Loading from "../Loading/Loading";
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";

const INCOME_SLICES = ["#06B6D4", "#16A34A", "#F59E0B", "#3B82F6", "#10B981"];
const EXPENSE_SLICES = ["#9333EA", "#EF4444", "#F97316", "#EAB308", "#8B5CF6"];
const INCOME_COLOR = "#06B6D4";
const EXPENSE_COLOR = "#9333EA";
const PIE_OUTER_RADIUS = 110;
const PIE_INNER_RADIUS = 70;

const processMonthlyData = (transactions) =>
  Array.from({ length: 12 }, (_, i) => {
    const monthTx = transactions.filter(
      (tx) => new Date(tx.date).getMonth() === i
    );
    const income = monthTx
      .filter((tx) => tx.type.toLowerCase() === "income")
      .reduce((s, t) => s + t.amount, 0);
    const expense = monthTx
      .filter((tx) => ["expense", "expanse"].includes(tx.type.toLowerCase()))
      .reduce((s, t) => s + t.amount, 0);
    return {
      month: new Date(0, i).toLocaleString("default", { month: "short" }),
      income,
      expense,
    };
  });

const processCategoryData = (filtered) =>
  filtered.reduce((acc, tx) => {
    const existing = acc.find((i) => i.name === tx.category);
    existing
      ? (existing.value += tx.amount)
      : acc.push({ name: tx.category, value: tx.amount });
    return acc;
  }, []);

const Reports = () => {
  const { user } = use(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterMonth, setFilterMonth] = useState("");
  const [selectedType, setSelectedType] = useState("expense");
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    (async () => {
      try {
        const res = await fetch(
          `https://assignment-10-server-kappa-one.vercel.app/my-transactions?email=${user.email}`,
          { headers: { authorization: `Bearer ${user.accessToken}` } }
        );
        if (!res.ok) throw new Error("Failed to fetch transactions");
        const data = await res.json();
        setTransactions(data);
        setMonthlyData(processMonthlyData(data));
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch transactions!");
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);
  const filteredTransactions = transactions.filter((tx) => {
    const typeMatch = tx.type.toLowerCase() === selectedType;
    const monthMatch = filterMonth
      ? new Date(tx.date).getMonth() + 1 === Number(filterMonth)
      : true;
    return typeMatch && monthMatch;
  });

  const categoryData = processCategoryData(filteredTransactions);

  const filteredMonthlyData = filterMonth
    ? monthlyData.filter((_, i) => i + 1 === Number(filterMonth))
    : monthlyData;

  const sliceColors =
    selectedType === "income" ? INCOME_SLICES : EXPENSE_SLICES;
  const pieBaseColor = selectedType === "income" ? INCOME_COLOR : EXPENSE_COLOR;
  const chartTitle =
    selectedType.charAt(0).toUpperCase() + selectedType.slice(1);

  if (loading) return <Loading />;

  if (transactions.length === 0)
    return (
      <div className="p-4 text-center min-h-screen dark:bg-gray-900 bg-gray-50">
        <h2 className="text-3xl font-bold text-indigo-700 dark:text-cyan-400">
          No Transactions Found!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Please add some income or expense transactions to view the reports.
        </p>
      </div>
    );

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-200 min-h-screen">
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-indigo-700 dark:text-cyan-400 text-center sm:text-left">
        Financial Reports
      </h2>

      {/* Filters */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2">
          <label className="font-medium">Filter by Month:</label>
          <select
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
            className="border p-2 rounded bg-white dark:bg-gray-700"
          >
            <option value="">All</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i + 1}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="font-medium">Filter by Type:</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="border p-2 rounded bg-white dark:bg-gray-700"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            {chartTitle} by Category
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={PIE_INNER_RADIUS}
                outerRadius={PIE_OUTER_RADIUS}
                fill={pieBaseColor}
                label={({ name, percent }) =>
                  `${name} (${(percent * 100).toFixed(1)}%)`
                }
              >
                {categoryData.map((_, i) => (
                  <Cell
                    key={i}
                    fill={sliceColors[i % sliceColors.length]}
                    stroke={sliceColors[i % sliceColors.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            Income vs Expense by Month
          </h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={filteredMonthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill={INCOME_COLOR} radius={[6, 6, 0, 0]} />
              <Bar
                dataKey="expense"
                fill={EXPENSE_COLOR}
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Reports;
