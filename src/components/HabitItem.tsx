import { Habit } from "@/context/HabitContext";

interface HabitItemProps {
  habit: Habit;
  isCompletedToday: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

export default function HabitItem({
  habit,
  isCompletedToday,
  onToggle,
  onDelete,
}: HabitItemProps) {
  return (
    <div className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
      <div className="flex items-center space-x-4">
        <button
          onClick={onToggle}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            isCompletedToday
              ? `${habit.color} text-white`
              : "bg-gray-100 text-gray-400 hover:bg-gray-200"
          }`}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </button>
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{habit.icon}</span>
            <span className={`font-medium ${isCompletedToday ? "line-through text-gray-400" : ""}`}>
              {habit.name}
            </span>
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-sm text-gray-500">Streak:</span>
            <span className={`text-sm font-semibold ${
              habit.streak >= 7 ? "text-emerald-500" :
              habit.streak >= 3 ? "text-yellow-500" :
              "text-gray-500"
            }`}>
              {habit.streak} {habit.streak === 1 ? "day" : "days"}
            </span>
            {habit.streak >= 7 && (
              <span className="text-xs bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full">
                🔥 Hot streak!
              </span>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={onDelete}
        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        aria-label="Delete habit"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}
