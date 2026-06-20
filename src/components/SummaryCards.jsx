import React from 'react';
import { DollarSign, ListTodo, TrendingUp, Calendar } from 'lucide-react';

const SummaryCards = ({ totalExpenses, totalTransactions, highestExpense, currentMonthExpense }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Expenses Card */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center">
        <div className="p-3 rounded-full bg-blue-50 text-blue-600 mr-4">
          <DollarSign className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Expenses</p>
          <p className="text-2xl font-bold text-gray-900">${totalExpenses.toFixed(2)}</p>
        </div>
      </div>

      {/* Total Transactions Card */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center">
        <div className="p-3 rounded-full bg-green-50 text-green-600 mr-4">
          <ListTodo className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Transactions</p>
          <p className="text-2xl font-bold text-gray-900">{totalTransactions}</p>
        </div>
      </div>

      {/* Highest Expense Card */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center">
        <div className="p-3 rounded-full bg-amber-50 text-amber-600 mr-4">
          <TrendingUp className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Highest Expense</p>
          <p className="text-2xl font-bold text-gray-900">${highestExpense.toFixed(2)}</p>
        </div>
      </div>

      {/* Current Month Expense Card */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center">
        <div className="p-3 rounded-full bg-purple-50 text-purple-600 mr-4">
          <Calendar className="h-6 w-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">This Month's Spending</p>
          <p className="text-2xl font-bold text-gray-900">${currentMonthExpense.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
