import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Budget = ({ budgets, setBudgets }) => {
  const [localBudgets, setLocalBudgets] = useState(budgets || {});
const navigate = useNavigate();

  const handleChange = (category, value) => {
    setLocalBudgets(prev => ({
      ...prev,
      [category]: Number(value),
    }));
  };

  const handleSave = () => {
    setBudgets(localBudgets);
   navigate("/");
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow">
      <h2 className="text-xl font-semibold mb-6">
        Monthly Category Budgets
      </h2>

      <div className="space-y-4">
        {Object.keys(localBudgets).map(category => (
          <div
            key={category}
            className="flex items-center justify-between"
          >
            <label className="text-gray-700 font-medium">
              {category}
            </label>

            <input
              type="number"
              placeholder="₹0"
              value={localBudgets[category] || ""}
              onChange={e =>
                handleChange(category, e.target.value)
              }
              className="w-32 text-right p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Save Budgets
      </button>
    </div>
  );
};

export default Budget;
