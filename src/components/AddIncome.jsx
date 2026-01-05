import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddIncome = ({ addIncome }) => {
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newIncome = {
      id: Date.now(),
      source,
      amount: Number(amount),
    };

    addIncome(newIncome);
    navigate('/');
  };

  return (
    
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add Income</h2>

        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
        >
          <option value="Salary">Salary</option>
          <option value="Agriculture">Agriculture</option>
          <option value="Business">Business</option>
          <option value="Freelance">Freelance</option>
          <option value="Other">Other</option>
        </select>

      <input
        type="number"
        placeholder="Amount"
        className="w-full mb-3 p-2 border rounded"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button className="w-full bg-green-600 text-white p-2 rounded" onClick={handleSubmit}>
        Add Income
      </button>
    </div>
  );
};

export default AddIncome;
