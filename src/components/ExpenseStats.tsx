"use client";

import { useExpenses } from "@/context/ExpenseContext";
import { format } from "date-fns";

export default function ExpenseStats() {
  const { getMonthlyStats, getBudgetStatus } = useExpenses();
  const monthlyStats = getMonthlyStats();
  const budgetStatus = getBudgetStatus();

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm p-4">
        <h3 className="font-semibold mb-3">This Month</h3>
        <div className="text-3xl font-bold text-orange-500">
          ${monthlyStats.total.toFixed(2)}
        </div>
        <div className="text-sm text-gray-500 mt-1">Total Expenses</div>
      </div>

      {budgetStatus.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="font-semibold mb-3">Budget Status</h3>
          <div className="space-y-2">
            {budgetStatus.map(({ category, budget, spent, remaining }) => (
              <div key={category} className="flex items-center justify-between">
                <span className="text-sm capitalize">{category}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500 rounded-full"
                      style={{ width: `${Math.min((spent / budget) * 100, 100)}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">${spent.toFixed(0)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
