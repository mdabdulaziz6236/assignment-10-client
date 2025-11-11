import React, { useEffect, useState, useContext, useMemo } from "react";
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer } from "recharts";
import Loading from "../Loading/Loading";
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";

const INCOME_SLICES = ["#06B6D4","#16A34A","#F59E0B","#3B82F6","#10B981"];
const EXPENSE_SLICES = ["#9333EA","#EF4444","#F97316","#EAB308","#8B5CF6"];
const INCOME_COLOR = "#06B6D4";
const EXPENSE_COLOR = "#9333EA";
const PIE_OUTER_RADIUS = 110;
const PIE_INNER_RADIUS = 70;

const processMonthlyData = (transactions) => Array.from({ length: 12 }, (_, i) => {
  const monthTx = transactions.filter(tx => new Date(tx.date).getMonth() === i);
  const income = monthTx.filter(tx => tx.type.toLowerCase() === "income").reduce((s, t) => s + t.amount, 0);
  const expense = monthTx.filter(tx => ["expense","expanse"].includes(tx.type.toLowerCase())).reduce((s, t) => s + t.amount, 0);
  return { month: new Date(0, i).toLocaleString("default", { month: "short" }), income, expense };
});

const processCategoryData = (filtered) => filtered.reduce((acc, tx) => {
  const existing = acc.find(i => i.name === tx.category);
  existing ? (existing.value += tx.amount) : acc.push({ name: tx.category, value: tx.amount });
  return acc;
}, []);

const CustomBarTooltip = ({ active, payload, label }) => active && payload?.length ? (
  <div className="p-3 bg-gray-900 border border-cyan-700/50 rounded-lg shadow-xl shadow-cyan-900/10">
    <p className="text-gray-100 font-bold mb-1">{label}</p>
    {payload.map((pld, i) => <p key={i} style={{ color: pld.fill }} className="font-semibold text-sm">{`${pld.dataKey.charAt(0).toUpperCase() + pld.dataKey.slice(1)} : ${pld.value}`}</p>)}
  </div>
) : null;

const CustomPieTooltip = ({ active, payload }) => active && payload?.length ? (
  <div className="p-3 bg-gray-900 border rounded-lg shadow-xl" style={{ borderColor: payload[0].fill || "#F3F4F6" }}>
    <p className="text-gray-100 font-bold mb-1">{payload[0].name}</p>
    <p style={{ color: payload[0].fill }} className="font-semibold text-sm">{`Amount: ${payload[0].value}`}</p>
  </div>
) : null;

const Reports = () => {
  const { user } = useContext(AuthContext);
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
        const res = await fetch(`http://localhost:3000/my-transactions?email=${user.email}`, { headers: { authorization: `Bearer ${user.accessToken}` } });
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

  const filteredTransactions = useMemo(() => transactions.filter(tx => {
    const typeMatch = tx.type.toLowerCase() === selectedType;
    const monthMatch = filterMonth ? new Date(tx.date).getMonth() + 1 === Number(filterMonth) : true;
    return typeMatch && monthMatch;
  }), [transactions, selectedType, filterMonth]);

  const categoryData = useMemo(() => processCategoryData(filteredTransactions), [filteredTransactions]);
  const filteredMonthlyData = useMemo(() => filterMonth ? monthlyData.filter((_, i) => i + 1 === Number(filterMonth)) : monthlyData, [monthlyData, filterMonth]);

  const sliceColors = selectedType === "income" ? INCOME_SLICES : EXPENSE_SLICES;
  const pieBaseColor = selectedType === "income" ? INCOME_COLOR : EXPENSE_COLOR;
  const chartTitle = selectedType.charAt(0).toUpperCase() + selectedType.slice(1);

  if (loading) return <Loading />;
  if (transactions.length === 0) return (
    <div className="p-4 sm:p-6 bg-gray-900 text-gray-100  text-center">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4">Financial Reports </h2>
      <div className="mt-20 p-10 bg-gray-800 rounded-lg shadow-xl">
        <p className="text-xl text-yellow-400"> No Transactions Found!</p>
        <p className="text-gray-400 mt-2">Please add some income or expense transactions to view the reports.</p>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 bg-gray-900 text-gray-100">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center sm:text-left">Financial Reports </h2>

      {/* Filters */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="font-medium text-gray-300 min-w-[120px]">Filter by Month:</label>
          <select value={filterMonth} onChange={e => setFilterMonth(e.target.value)} className="border p-2 rounded bg-gray-800 text-gray-100 border-gray-700 sm:w-auto focus:ring-2 focus:ring-cyan-400 transition">
            <option value="">All</option>
            {Array.from({ length: 12 }, (_, i) => <option key={i} value={i + 1}>{new Date(0, i).toLocaleString("default", { month: "long" })}</option>)}
          </select>
        </div>

        <div className="flex items-center gap-2 sm:w-auto">
          <label className="font-medium text-gray-300 min-w-[120px]">Filter by Type:</label>
          <select value={selectedType} onChange={e => setSelectedType(e.target.value)} className="border p-2 rounded bg-gray-800 text-gray-100 border-gray-700 sm:w-auto focus:ring-2 focus:ring-violet-400 transition">
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-900 p-4 rounded-2xl shadow-xl border border-gray-800">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-center sm:text-left text-gray-100">{chartTitle} by Category </h3>
          <div className="w-full flex items-center justify-center h-64 sm:h-96">
            <ResponsiveContainer width="100%" height="100%">
              {categoryData.length > 0 ? (
                <PieChart>
                  <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={PIE_INNER_RADIUS} outerRadius={PIE_OUTER_RADIUS} fill={pieBaseColor} labelLine={false} label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`} style={{ outline: "none" }}>
                    {categoryData.map((_, i) => <Cell key={i} fill={sliceColors[i % sliceColors.length]} strokeWidth={2} stroke={sliceColors[i % sliceColors.length]} />)}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                </PieChart>
              ) : (<></>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-900 p-4 rounded-2xl shadow-xl border border-gray-800">
          <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-center sm:text-left text-gray-100">Income vs Expense by Month </h3>
          <div className="w-full h-64 sm:h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={filteredMonthlyData}>
                <XAxis dataKey="month" stroke="#9CA3AF" tick={{ fill: "#9CA3AF", fontSize: 12 }} interval={0} />
                <YAxis stroke="#9CA3AF" tick={{ fill: "#9CA3AF", fontSize: 12 }} tickFormatter={v => `${v}`} />
                <Tooltip content={<CustomBarTooltip />} />
                <Legend wrapperStyle={{ color: "#D1D5DB", fontWeight: "600", paddingTop: "10px" }} iconType="circle" />
                <Bar dataKey="income" fill={INCOME_COLOR} radius={[6,6,0,0]} name="Income" />
                <Bar dataKey="expense" fill={EXPENSE_COLOR} radius={[6,6,0,0]} name="Expense" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
