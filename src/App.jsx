import React, { useState, useEffect, useMemo, useCallback } from 'react';
import SummaryCards from './components/SummaryCards';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Charts from './components/Charts';
import { PiggyBank } from 'lucide-react';

function App() {
  // State for expenses - initialized from localStorage if available, otherwise empty array
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('expenses');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing localStorage expenses:', e);
        return [];
      }
    }
    return [];
  });

  // State for editing mode
  const [editingExpense, setEditingExpense] = useState(null);

  // States for search and filter
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // useEffect: Persistence to localStorage when expenses state changes
  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [expenses]);

  // useCallback: Save expense handler (adds a new expense or edits an existing one)
  const handleSaveExpense = useCallback((expenseData) => {
    if (editingExpense) {
      // Update action
      setExpenses((prevExpenses) =>
        prevExpenses.map((exp) =>
          exp.id === editingExpense.id ? { ...exp, ...expenseData } : exp
        )
      );
      setEditingExpense(null);
    } else {
      // Create action
      const newExpense = {
        id: `exp-${Date.now()}`,
        ...expenseData,
      };
      setExpenses((prevExpenses) => [newExpense, ...prevExpenses]);
    }
  }, [editingExpense]);

  // useCallback: Delete expense handler
  const handleDeleteExpense = useCallback((id) => {
    const confirmed = window.confirm('Are you sure you want to delete this expense?');
    if (confirmed) {
      setExpenses((prevExpenses) => prevExpenses.filter((exp) => exp.id !== id));
      // Reset edit mode if deleting the item currently being edited
      if (editingExpense?.id === id) {
        setEditingExpense(null);
      }
    }
  }, [editingExpense]);

  // useCallback: Edit trigger handler
  const handleEditExpense = useCallback((expense) => {
    setEditingExpense(expense);
  }, []);

  // useCallback: Cancel editing handler
  const handleCancelEdit = useCallback(() => {
    setEditingExpense(null);
  }, []);

  // useMemo: Calculate global dashboard stats
  const stats = useMemo(() => {
    const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
    const totalTransactions = expenses.length;
    const highestExpense = expenses.reduce((max, item) => (item.amount > max ? item.amount : max), 0);
    
    // Find expenses in the current month
    const today = new Date();
    const currentMonth = today.getMonth(); // 0-11
    const currentYear = today.getFullYear();

    const currentMonthExpense = expenses.reduce((sum, item) => {
      const itemDate = new Date(item.date);
      // We parse as UTC to match database YYYY-MM-DD cleanly without local shift issues
      const itemMonth = itemDate.getUTCMonth();
      const itemYear = itemDate.getUTCFullYear();
      if (itemMonth === currentMonth && itemYear === currentYear) {
        return sum + item.amount;
      }
      return sum;
    }, 0);

    return {
      totalExpenses,
      totalTransactions,
      highestExpense,
      currentMonthExpense,
    };
  }, [expenses]);

  // useMemo: Filtered expenses based on search and category choice
  const filteredExpenses = useMemo(() => {
    return expenses.filter((exp) => {
      const matchesSearch = exp.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === '' || exp.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [expenses, searchTerm, selectedCategory]);

  // useMemo: Recharts category data (overall dataset)
  const categoryData = useMemo(() => {
    const mapping = {};
    expenses.forEach((item) => {
      mapping[item.category] = (mapping[item.category] || 0) + item.amount;
    });
    return Object.keys(mapping).map((cat) => ({
      name: cat,
      value: mapping[cat],
    }));
  }, [expenses]);

  // useMemo: Recharts monthly aggregate data (overall dataset)
  const monthlyData = useMemo(() => {
    const mapping = {};
    expenses.forEach((item) => {
      const dateObj = new Date(item.date);
      const monthName = dateObj.toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
      const sortKey = item.date.substring(0, 7); // YYYY-MM
      if (!mapping[sortKey]) {
        mapping[sortKey] = { sortKey, month: monthName, amount: 0 };
      }
      mapping[sortKey].amount += item.amount;
    });

    return Object.values(mapping)
      .sort((a, b) => a.sortKey.localeCompare(b.sortKey))
      .map(({ month, amount }) => ({ month, amount }));
  }, [expenses]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <PiggyBank className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-xl font-semibold text-gray-900">
                ExpenseTracker <span className="text-xs font-normal text-gray-500 bg-gray-100 py-1 px-2 rounded-full ml-2">Internship Project</span>
              </span>
            </div>
            <div className="flex items-center text-xs text-gray-500 font-medium">
              B.Tech CSE Submission
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Dashboard Summary Cards */}
        <SummaryCards 
          totalExpenses={stats.totalExpenses} 
          totalTransactions={stats.totalTransactions}
          highestExpense={stats.highestExpense}
          currentMonthExpense={stats.currentMonthExpense}
        />

        {/* Form and List Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Form container */}
          <div className="lg:col-span-1">
            <ExpenseForm 
              onSave={handleSaveExpense}
              editingExpense={editingExpense}
              onCancelEdit={handleCancelEdit}
            />
          </div>

          {/* List table container */}
          <div className="lg:col-span-2">
            <ExpenseList 
              expenses={filteredExpenses}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              onEdit={handleEditExpense}
              onDelete={handleDeleteExpense}
            />
          </div>
        </div>

        {/* Charts Visualizations */}
        <Charts 
          categoryData={categoryData} 
          monthlyData={monthlyData} 
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-xs text-gray-500">
          Personal Expense Tracker &copy; {new Date().getFullYear()} &middot; Developed for internship evaluation.
        </div>
      </footer>
    </div>
  );
}

export default App;
