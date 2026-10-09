"use client";

import { useHabits } from "@/context/HabitContext";
import HabitItem from "./HabitItem";

export default function HabitList() {
  const { habits, toggleHabit, deleteHabit } = useHabits();
  const today = new Date().toISOString().split("T")[0];

  if (habits.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-12 text-center">
        <div className="text-6xl mb-4">🎯</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Start Building Good Habits
        </h3>
        <p className="text-gray-500">
          Add your first habit above and track your progress!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">
          Your Habits
          <span className="ml-2 text-sm font-normal text-gray-500">
            {habits.length} total
          </span>
        </h2>
      </div>
      <div className="divide-y divide-gray-200">
        {habits.map((habit) => (
          <HabitItem
            key={habit.id}
            habit={habit}
            isCompletedToday={habit.completedDates.includes(today)}
            onToggle={() => toggleHabit(habit.id, today)}
            onDelete={() => deleteHabit(habit.id)}
          />
        ))}
      </div>
    </div>
  );
}
