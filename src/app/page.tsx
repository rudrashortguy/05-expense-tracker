"use client";

import Header from "@/components/Header";
import AddExpense from "@/components/AddExpense";
import ExpenseStats from "@/components/ExpenseStats";
import ExpenseList from "@/components/ExpenseList";
import { ExpenseProvider } from "@/context/ExpenseContext";

export default function Home() {
  return (
    <ExpenseProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-lg mx-auto px-4 py-6 space-y-4">
          <AddExpense />
          <ExpenseStats />
          <ExpenseList />
        </main>
      </div>
    </ExpenseProvider>
  );
}
