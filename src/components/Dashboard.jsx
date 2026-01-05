import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaUtensils, FaPlane, FaHome, FaShoppingBag, FaEllipsisH } from "react-icons/fa";

const Dashboard = ({ expenses, income, deleteExpense, budgets }) => {
  const [filter, setFilter] = useState("all");
  const categories = ["Food", "Travel", "Rent", "Shopping", "Other"];

  // ===== TOTALS =====
  const totalIncome = income.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const balance = totalIncome - totalExpenses;

  // ===== TRANSACTIONS =====
  const transactions = [
    ...income.map((item) => ({
      id: item.id,
      description: item.source,
      amount: item.amount,
      type: "income",
      date: item.date,
    })),
    ...expenses.map((item) => ({
      id: item.id,
      description: item.name,
      amount: item.amount,
      type: "expense",
      category: item.category,
      date: item.date,
    })),
  ]
    .filter((txn) => (filter === "all" ? true : txn.type === filter))
    .sort((a, b) => b.id - a.id);

  // ===== MONTHLY CATEGORY SPENDING =====
  const now = new Date();

  const monthlyExpenses = expenses.filter((e) => {
    const d = new Date(e.date);
    return (
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  });

  const spentByCategory = monthlyExpenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});
const categoryIcons = {
  Food: <FaUtensils className="text-orange-500" />,
  Travel: <FaPlane className="text-blue-500" />,
  Rent: <FaHome className="text-purple-500" />,
  Shopping: <FaShoppingBag className="text-pink-500" />,
  Other: <FaEllipsisH className="text-gray-500" />,
};
const [showBudgets, setShowBudgets] = useState(true);


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex gap-3">
            <Link
              to="/add-income"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            >
              + Income
            </Link>
            <Link
              to="/add-transaction"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              + Expense
            </Link>
          </div>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-2xl text-white shadow-lg">
            <p className="text-sm opacity-90">Current Balance</p>
            <p className="text-4xl font-bold mt-2">
              ₹{balance.toFixed(2)}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-sm text-gray-500">Total Income</p>
            <p className="text-2xl font-semibold text-green-600 mt-2">
              +₹{totalIncome.toFixed(2)}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <p className="text-sm text-gray-500">Total Expenses</p>
            <p className="text-2xl font-semibold text-red-500 mt-2">
              -₹{totalExpenses.toFixed(2)}
            </p>
          </div>
        </div>

        {/* ===== AUTO-UPDATING BUDGET PROGRESS ===== */}
     {/* Budgets Section */}
{budgets && (
  <div className="bg-white rounded-2xl shadow-sm">

    {/* Header */}
    <div
      onClick={() => setShowBudgets(!showBudgets)}
      className="flex justify-between items-center p-5 cursor-pointer select-none"
    >
      <h2 className="text-lg font-semibold text-gray-800">
        Monthly Budgets
      </h2>

      <div className="flex items-center gap-3">
        <Link
          to="/budgets"
          onClick={(e) => e.stopPropagation()}
          className="text-sm text-blue-600 hover:underline"
        >
          Edit
        </Link>
        {showBudgets ? (
          <FiChevronUp className="text-gray-500" />
        ) : (
          <FiChevronDown className="text-gray-500" />
        )}
      </div>
    </div>

    {/* Content */}
    {showBudgets && (
      <div className="px-5 pb-5 space-y-4">

        {categories.map((category) => {
          const spent = spentByCategory[category] || 0;
          const limit = budgets[category] || 0;
          const percent = limit ? Math.min((spent / limit) * 100, 100) : 0;
          const remaining = Math.max(limit - spent, 0);

          const barColor =
            percent < 70
              ? "bg-green-500"
              : percent < 90
              ? "bg-yellow-400"
              : "bg-red-500";

          return (
            <div key={category}>
              {/* Title Row */}
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  {categoryIcons[category]}
                  {category}
                </div>

                <span className="text-xs text-gray-500">
                  ₹{spent} / ₹{limit}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full ${barColor} transition-all duration-500`}
                  style={{ width: `${percent}%` }}
                />
              </div>

              {/* Footer */}
              <p className="text-xs text-gray-500 mt-1">
                {spent > limit
                  ? `Exceeded by ₹${spent - limit}`
                  : `₹${remaining} remaining`}
              </p>
            </div>
          );
        })}
      </div>
    )}
  </div>
)}
        {/* TRANSACTIONS */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              Recent Transactions
            </h2>

            <div className="flex gap-2">
              {["all", "income", "expense"].map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-4 py-1 rounded-full text-sm border transition ${
                    filter === type
                      ? "bg-gray-800 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {transactions.length === 0 ? (
            <p className="text-center text-gray-500 py-10">
              No transactions yet
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-500 text-sm border-b">
                    <th className="py-3">Type</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th className="text-right">Amount</th>
                    <th className="text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((txn) => (
                    <tr
                      key={txn.id}
                      className="border-b last:border-0 hover:bg-gray-50"
                    >
                      <td className="py-3">
                        {txn.type === "income" ? "Income" : "Expense"}
                      </td>
                      <td>{txn.description}</td>
                      <td>{txn.category || "-"}</td>
                      <td
                        className={`text-right font-semibold ${
                          txn.type === "income"
                            ? "text-green-600"
                            : "text-red-500"
                        }`}
                      >
                        {txn.type === "income" ? "+" : "-"}₹
                        {txn.amount.toFixed(2)}
                      </td>
                      <td className="text-right">
                        {txn.type === "expense" && (
                          <button
                            onClick={() => deleteExpense(txn.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            🗑
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
