import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

const COLORS = [
  '#3b82f6', // blue
  '#10b981', // emerald
  '#f59e0b', // amber
  '#8b5cf6', // purple
  '#f43f5e', // rose
  '#64748b', // slate
  '#06b6d4', // cyan
  '#0d9488'  // teal
];

const Charts = ({ categoryData, monthlyData }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      {/* Category Breakdown (Pie Chart) */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Category-wise Spending</h2>
        <div className="h-72 w-full flex-1 min-h-[250px]">
          {categoryData.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-400 text-sm">
              No category data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`$${value.toFixed(2)}`, 'Spent']}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Monthly Expense (Bar Chart) */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Monthly Expenses</h2>
        <div className="h-72 w-full flex-1 min-h-[250px]">
          {monthlyData.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-400 text-sm">
              No monthly data available
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={monthlyData}
                margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  tickLine={false} 
                  axisLine={false}
                  stroke="#94a3b8"
                  fontSize={12}
                />
                <YAxis 
                  tickLine={false} 
                  axisLine={false}
                  stroke="#94a3b8"
                  fontSize={12}
                  tickFormatter={(val) => `$${val}`}
                />
                <Tooltip 
                  formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                />
                <Bar 
                  dataKey="amount" 
                  fill="#3b82f6" 
                  radius={[4, 4, 0, 0]}
                  maxBarSize={50}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default Charts;
