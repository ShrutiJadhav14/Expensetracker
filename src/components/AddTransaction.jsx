import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AddTransaction = ({ addExpense }) => {
  const [name, setName] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [category, setCategory] = React.useState('Groceries');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) return alert('Enter name');
    if (!amount || isNaN(amount)) return alert('Enter valid amount');

    addExpense({
      id: Date.now(),
      name: name.trim(),
      amount: Number(amount),
      category,
    });

    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add Transaction
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Transaction Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Transaction Name
            </label>
            <input
              type="text"
              placeholder="e.g. Monthly Rent"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Amount
            </label>
            <input
              type="number"
              placeholder="e.g. 500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Groceries">Groceries</option>
              <option value="Food">Food</option>
              <option value="Rent">Rent</option>
              <option value="Shopping">Shopping</option>
              <option value="Transport">Transport</option>
              <option value="Bills">Bills</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Add Transaction
          </button>
        </form>

        <Link
          to="/"
          className="block text-center mt-5 text-blue-600 hover:underline"
        >
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default AddTransaction;
