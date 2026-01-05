import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ expenses, deleteExpense , totalIncome,income}) => {
  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );
const transactions = [
    ...income.map(item => ({
      id: item.id,
      description: item.source,
      amount: item.amount,
      type: 'income',
    })),
    ...expenses.map(item => ({
      id: item.id,
      description: item.name,
      amount: item.amount,
      type: 'expense',
    })),
  ].sort((a, b) => b.id - a.id); // latest first


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Expense Tracker</h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded shadow">
            <p className="text-sm text-gray-600">Total Income</p>
            <p className="text-3xl font-bold text-green-600">${totalIncome}</p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <p className="text-sm text-gray-600">Total Expenses</p>
            <p className="text-3xl font-bold text-red-600">
              ${totalExpenses.toFixed(2)}
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <p className="text-sm text-gray-600">Balance</p>
            <p className="text-3xl font-bold text-blue-600">
              ${(totalIncome - totalExpenses).toFixed(2)}
            </p>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-2xl font-bold mb-4">Transactions</h2>

          {expenses.length === 0 ? (
            <p className="text-gray-500">No transactions yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Type</th>
                    <th className="text-left py-2">Description</th>
                    <th className="text-left py-2">Amount</th>
                    <th className="text-left py-2">Action</th>
                  </tr>
                </thead>

                <tbody>
                   {transactions.map(txn => (
                    <tr key={txn.id} className="border-b">
                      <td className="py-2 font-medium">
                        {txn.type === 'income' ? 'Income' : 'Expense'}
                      </td>

                      <td className="py-2">{txn.description}</td>

                      <td
                        className={`py-2 font-semibold ${
                          txn.type === 'income'
                            ? 'text-green-600'
                            : 'text-red-600'
                        }`}
                      >
                        {txn.type === 'income' ? '+' : '-'}$
                        {txn.amount.toFixed(2)}
                      </td>

                      <td className="py-2">
                        {txn.type === 'expense' && (
                          <button
                            onClick={() => deleteExpense(txn.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <Link
            to="/add-transaction"
            className="inline-block mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Expense
          </Link>
          <Link
            to="/add-income"
            className="inline-block mt-6 ml-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Income
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
