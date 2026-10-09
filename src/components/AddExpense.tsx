"use client";

import { useState } from "react";
import { useExpenses } from "@/context/ExpenseContext";
import { Expense } from "@/types";

const CATEGORIES = ['food', 'transport', 'entertainment', 'shopping', 'utilities', 'other'] as const;

export default function AddExpense() {
  const { addExpense } = useExpenses();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Expense['category']>('food');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState<Expense['paymentMethod']>('cash');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !amount) return;

    addExpense({
      description: description.trim(),
      amount: Number(amount),
      category,
      date,
      paymentMethod,
    });

    // Reset
    setDescription('');
    setAmount('');
    setCategory('food');
    setDate(new Date().toISOString().split('T')[0]);
    setPaymentMethod('cash');
    setShowForm(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <button
        onClick={() => setShowForm(!showForm)}
        className="w-full flex items-center justify-between text-left"
      >
        <span className="font-semibold text-lg">Add Expense</span>
        <span className={`transform transition-transform ${showForm ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Groceries"
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0.01"
                step="0.01"
                className="w-full p-3 border border-gray-200 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-sm capitalize ${
                    category === cat ? 'bg-orange-500 text-white' : 'bg-gray-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
            <div className="flex gap-2">
              {(['cash', 'card', 'transfer'] as const).map(method => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setPaymentMethod(method)}
                  className={`px-3 py-1.5 rounded-lg text-sm capitalize ${
                    paymentMethod === method ? 'bg-orange-500 text-white' : 'bg-gray-100'
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
          >
            Add Expense
          </button>
        </form>
      )}
    </div>
  );
}
