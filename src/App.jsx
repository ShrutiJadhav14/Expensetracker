import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AddTransaction from './components/AddTransaction';
import AddIncome from './components/AddIncome';
import Budget from './components/Budget';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]);
  const [budgets, setBudgets] = useState({
    Food: 1000,
    Travel: 2000,
    Rent: 5000,
    Shopping: 1500,
    Other: 1000,
  });

  const addExpense = (expense) => {
    setExpenses(prevExpenses => [...prevExpenses, expense]);
  };

  const deleteExpense = (id) => {
    setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
  };

  const addIncome = (incomeItem) => {
    setIncome(prevIncome => [...prevIncome, incomeItem]);
  };  

  const totalIncome = income.reduce((total, item) => total + item.amount, 0);

  return (
    <Router>
      <Routes>
        {/* Dashboard Route */}
        <Route 
          path="/" 
          element={
            <Dashboard 
              expenses={expenses} 
              deleteExpense={deleteExpense} 
              income={income} 
              totalIncome={totalIncome} 
              budgets={budgets} 
            />
          } 
        />

        {/* Budget Route */}
        <Route 
          path="/budgets" 
          element={
            <Budget budgets={budgets} setBudgets={setBudgets} />
          } 
        />

        {/* Add Transaction */}
        <Route
          path="/add-transaction"
          element={<AddTransaction addExpense={addExpense} />}
        />

        {/* Add Income */}
        <Route
          path="/add-income"
          element={<AddIncome addIncome={addIncome} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
