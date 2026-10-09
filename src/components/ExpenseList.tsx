"use client";

import { useExpenses } from "@/context/ExpenseContext";

export default function ExpenseList() {
  const { expenses, deleteExpense } = useExpenses();

  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <div className="text-5xl mb-3">📝</div>
        <h3 className="font-semibold text-gray-900 mb-1">No Expenses Yet</h3>
        <p className="text-gray-500 text-sm">Start tracking your spending</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold">Recent Expenses</h2>
      </div>
      <div className="divide-y divide-gray-100">
        {expenses.map((expense) => (
          <div key={expense.id} className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-semibold">{expense.description}</div>
                <div className="text-sm text-gray-500">
                  {expense.category} • {expense.paymentMethod}
                </div>
              </div>
              <button
                onClick={() => deleteExpense(expense.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
                aria-label="Delete expense"
              >
                ✕
              </button>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-lg font-bold text-orange-500">
                ${expense.amount.toFixed(2)}
              </span>
              <span className="text-xs text-gray-400">
                {expense.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
