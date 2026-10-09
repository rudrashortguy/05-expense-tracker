"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Habit {
  id: string;
  name: string;
  icon: string;
  color: string;
  completedDates: string[];
  streak: number;
  createdAt: string;
}

interface HabitContextType {
  habits: Habit[];
  addHabit: (habit: Omit<Habit, 'id' | 'completedDates' | 'streak' | 'createdAt'>) => void;
  toggleHabit: (id: string, date: string) => void;
  deleteHabit: (id: string) => void;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

const STORAGE_KEY = "habit-tracker-data";

function loadHabits(): Habit[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

function saveHabits(habits: Habit[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
}

export function HabitProvider({ children }: { children: ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setHabits(loadHabits());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      saveHabits(habits);
    }
  }, [habits, mounted]);

  const addHabit = (habit: Omit<Habit, 'id' | 'completedDates' | 'streak' | 'createdAt'>) => {
    const newHabit: Habit = {
      ...habit,
      id: crypto.randomUUID(),
      completedDates: [],
      streak: 0,
      createdAt: new Date().toISOString(),
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const toggleHabit = (id: string, date: string) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id !== id) return habit;

      const isCompleted = habit.completedDates.includes(date);
      const newCompletedDates = isCompleted
        ? habit.completedDates.filter(d => d !== date)
        : [...habit.completedDates, date];

      // Calculate new streak
      const sortedDates = newCompletedDates.sort();
      let streak = 0;
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      for (let i = sortedDates.length - 1; i >= 0; i--) {
        const date = new Date(sortedDates[i]);
        date.setHours(0, 0, 0, 0);
        const expected = new Date(today);
        expected.setDate(expected.getDate() - (sortedDates.length - 1 - i));

        if (date.getTime() === expected.getTime()) {
          streak++;
        } else {
          break;
        }
      }

      return {
        ...habit,
        completedDates: newCompletedDates,
        streak,
      };
    }));
  };

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(h => h.id !== id));
  };

  return (
    <HabitContext.Provider value={{ habits, addHabit, toggleHabit, deleteHabit }}>
      {children}
    </HabitContext.Provider>
  );
}

export function useHabits() {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error("useHabits must be used within a HabitProvider");
  }
  return context;
}
