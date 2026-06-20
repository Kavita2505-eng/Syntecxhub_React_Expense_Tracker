import React from 'react';
import { Edit2, Trash2, Search, Filter } from 'lucide-react';
import { CATEGORIES } from './ExpenseForm';

const ExpenseList = ({ 
  expenses, 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory, 
  onEdit, 
  onDelete 
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {/* Search & Filter Header */}
      <div className="p-4 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            placeholder="Search expenses by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
          />
        </div>

        {/* Category Filter */}
        <div className="relative w-full sm:w-48">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Filter className="h-4 w-4" />
          </span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        {expenses.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p className="text-base font-medium">No expenses found</p>
            <p className="text-sm mt-1 text-gray-400">
              {searchTerm || selectedCategory 
                ? 'Try adjusting your search query or category filter.' 
                : 'Click "Add Expense" to start tracking your spending.'}
            </p>
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200 text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase tracking-wider text-xs font-semibold">
              <tr>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3 text-right">Amount</th>
                <th className="px-6 py-3 text-center w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {expenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-50 transition-colors duration-75">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {expense.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                    {new Date(expense.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      timeZone: 'UTC' // to prevent local shift issues
                    })}
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-gray-900 whitespace-nowrap">
                    ${expense.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() => onEdit(expense)}
                        title="Edit expense"
                        className="text-gray-500 hover:text-blue-600 p-1 rounded hover:bg-gray-100 transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onDelete(expense.id)}
                        title="Delete expense"
                        className="text-gray-500 hover:text-red-600 p-1 rounded hover:bg-gray-100 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
