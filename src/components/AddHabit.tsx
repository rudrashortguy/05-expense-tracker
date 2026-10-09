"use client";

import { useState } from "react";
import { useHabits } from "@/context/HabitContext";

const ICONS = ["💪", "📚", "🏃", "💧", "🧘", "✍️", "💤", "🥗", "🎯", "⏰"];
const COLORS = [
  { name: "Emerald", value: "bg-emerald-500" },
  { name: "Blue", value: "bg-blue-500" },
  { name: "Purple", value: "bg-purple-500" },
  { name: "Pink", value: "bg-pink-500" },
  { name: "Orange", value: "bg-orange-500" },
  { name: "Teal", value: "bg-teal-500" },
];

export default function AddHabit() {
  const { addHabit } = useHabits();
  const [name, setName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("💪");
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addHabit({
      name: name.trim(),
      icon: selectedIcon,
      color: selectedColor.value,
    });

    setName("");
    setSelectedIcon("💪");
    setSelectedColor(COLORS[0]);
    setIsOpen(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left"
      >
        <span className="text-lg font-semibold">Add New Habit</span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Habit Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Morning Exercise"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              maxLength={30}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Icon
            </label>
            <div className="flex flex-wrap gap-2">
              {ICONS.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setSelectedIcon(icon)}
                  className={`w-10 h-10 text-xl rounded-lg border-2 transition-all ${
                    selectedIcon === icon
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Color
            </label>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((color) => (
                <button
                  key={color.name}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-lg ${color.value} transition-all ${
                    selectedColor.name === color.name
                      ? "ring-2 ring-offset-2 ring-emerald-500"
                      : ""
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-emerald-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Add Habit
          </button>
        </form>
      )}
    </div>
  );
}
