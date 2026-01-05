import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import AddTransaction from './components/AddTransaction';
import AddIncome from './components/AddIncome';
const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState([]); //add income state

  const addExpense = (expense) => { // Add new expense to the list it is state
    setExpenses(prevExpenses => [...prevExpenses, expense]);
  };
  const deleteExpense = (id) => { //keep only those expense whose id is not equal to the id to be deleted
    setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id));
  };
  const addIncome = (income) => { //function to add income
    setIncome(prevIncome => [...prevIncome, income]);
  };  
  const totalIncome = income.reduce((totalIncome, incomeItem) => totalIncome + incomeItem.amount, 0); //calculate total income
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard expenses={expenses} deleteExpense={deleteExpense} income={income} totalIncome={totalIncome}  //data pass karn dashboard la
           />} /> 
        <Route
          path="/add-transaction"
          element={<AddTransaction addExpense={addExpense} />}
        />
      <Route
  path="/add-income"
  element={<AddIncome addIncome={addIncome} />}
/>

      </Routes>
    </Router>
  );
};

export default App;
