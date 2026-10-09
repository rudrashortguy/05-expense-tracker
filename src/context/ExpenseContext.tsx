"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Expense, Budget } from "@/types";

interface ExpenseContextType {
  expenses: Expense[];
  budgets: Budget[];
  addExpense: (expense: Omit<Expense, 'id'>) => void;
  deleteExpense: (id: string) => void;
  setBudget: (category: string, amount: number) => void;
  getMonthlyStats: () => { total: number; byCategory: Record<string, number> };
  getBudgetStatus: () => { category: string; budget: number; spent: number; remaining: number }[];
}

const EXPENSE_STORAGE_KEY = "expense-tracker-expenses";
const BUDGET_STORAGE_KEY = "expense-tracker-budgets";

function loadExpenses(): Expense[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(EXPENSE_STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

function saveExpenses(expenses: Expense[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(EXPENSE_STORAGE_KEY, JSON.stringify(expenses));
}

function loadBudgets(): Budget[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(BUDGET_STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

function saveBudgets(budgets: Budget[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(BUDGET_STORAGE_KEY, JSON.stringify(budgets));
}

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setExpenses(loadExpenses());
    setBudgets(loadBudgets());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      saveExpenses(expenses);
      saveBudgets(budgets);
    }
  }, [expenses, budgets, mounted]);

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense: Expense = {
      ...expense,
      id: crypto.randomUUID(),
    };
    setExpenses(prev => [newExpense, ...prev]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  const setBudget = (category: string, amount: number) => {
    setBudgets(prev => {
      const existing = prev.find(b => b.category === category);
      if (existing) {
        return prev.map(b => b.category === category ? { ...b, amount } : b);
      }
      return [...prev, { id: crypto.randomUUID(), category, amount, spent: 0 }];
    });
  };

  const getMonthlyStats = () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthExpenses = expenses.filter(e => new Date(e.date) >= startOfMonth);

    const total = monthExpenses.reduce((sum, e) => sum + e.amount, 0);
    const byCategory = monthExpenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {} as Record<string, number>);

    return { total, byCategory };
  };

  const getBudgetStatus = () => {
    return budgets.map(budget => {
      const spent = expenses
        .filter(e => e.category === budget.category)
        .reduce((sum, e) => sum + e.amount, 0);
      return {
        category: budget.category,
        budget: budget.amount,
        spent,
        remaining: budget.amount - spent,
      };
    });
  };

  return (
    <ExpenseContext.Provider value={{
      expenses,
      budgets,
      addExpense,
      deleteExpense,
      setBudget,
      getMonthlyStats,
      getBudgetStatus,
    }}>
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error("useExpenses must be used within an ExpenseProvider");
  }
  return context;
}
