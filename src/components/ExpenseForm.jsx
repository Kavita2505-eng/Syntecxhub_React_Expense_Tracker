import React, { useState, useEffect, useRef } from 'react';

const CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Utilities & Bills',
  'Entertainment',
  'Housing & Rent',
  'Healthcare',
  'Education',
  'Miscellaneous'
];

const ExpenseForm = ({ onSave, editingExpense, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  // useRef to focus the Title input
  const titleInputRef = useRef(null);

  // Focus the input when component mounts or when editingExpense changes
  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, [editingExpense]);

  // Load values if we are editing an expense
  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount.toString());
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
      setError('');
    } else {
      // Reset form
      setTitle('');
      setAmount('');
      setCategory('');
      // Default to today's date in local time YYYY-MM-DD
      const today = new Date().toISOString().split('T')[0];
      setDate(today);
      setError('');
    }
  }, [editingExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!title.trim()) {
      setError('Please enter an expense title.');
      titleInputRef.current?.focus();
      return;
    }
    if (!amount || parseFloat(amount) <= 0 || isNaN(parseFloat(amount))) {
      setError('Please enter a valid amount greater than 0.');
      return;
    }
    if (!category) {
      setError('Please select a category.');
      return;
    }
    if (!date) {
      setError('Please select a date.');
      return;
    }

    const expenseData = {
      title: title.trim(),
      amount: parseFloat(amount),
      category,
      date,
    };

    onSave(expenseData);

    // Clear form if we were not editing
    if (!editingExpense) {
      setTitle('');
      setAmount('');
      setCategory('');
      const today = new Date().toISOString().split('T')[0];
      setDate(today);
      titleInputRef.current?.focus();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        {editingExpense ? 'Edit Expense' : 'Add New Expense'}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Expense Title *
          </label>
          <input
            id="title"
            type="text"
            ref={titleInputRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Grocery Shopping"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        {/* Amount */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount ($) *
          </label>
          <input
            id="amount"
            type="number"
            step="0.01"
            min="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
          >
            <option value="">-- Select Category --</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date *
          </label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors duration-150"
          >
            {editingExpense ? 'Update Expense' : 'Add Expense'}
          </button>
          
          {editingExpense && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="bg-gray-150 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md text-sm border border-gray-300 transition-colors duration-150"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
export { CATEGORIES };
