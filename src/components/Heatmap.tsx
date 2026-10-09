"use client";

import { useState } from "react";
import { addDays, format, startOfWeek, differenceInCalendarDays } from "date-fns";
import { Habit } from "@/context/HabitContext";

interface HeatmapProps {
  habits: Habit[];
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export default function Heatmap({ habits, selectedDate, onSelectDate }: HeatmapProps) {
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);

  // Generate last 84 days (12 weeks)
  const days = Array.from({ length: 84 }, (_, i) => {
    const date = addDays(new Date(), -83 + i);
    return date;
  });

  // Group by weeks
  const weeks: Date[][] = [];
  let currentWeek: Date[] = [];

  days.forEach((day) => {
    const dayOfWeek = day.getDay();
    if (dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(day);
  });
  if (currentWeek.length > 0) {
    weeks.push(currentWeek);
  }

  // Fill first week if needed
  if (weeks.length > 0 && weeks[0].length < 7) {
    const firstDay = weeks[0][0];
    for (let i = 0; i < firstDay.getDay(); i++) {
      weeks[0].unshift(addDays(firstDay, -(firstDay.getDay() - i)));
    }
  }

  const getCompletionCount = (date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return habits.filter(h => h.completedDates.includes(dateStr)).length;
  };

  const getIntensity = (count: number) => {
    if (count === 0) return "bg-gray-100";
    if (count === 1) return "bg-emerald-200";
    if (count === 2) return "bg-emerald-300";
    if (count >= 3) return "bg-emerald-500";
    return "bg-gray-100";
  };

  const isToday = (date: Date) => {
    return format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>Last 12 weeks</span>
        <div className="flex items-center space-x-1">
          <span className="text-xs">Less</span>
          <div className="w-3 h-3 bg-gray-100 rounded"></div>
          <div className="w-3 h-3 bg-emerald-200 rounded"></div>
          <div className="w-3 h-3 bg-emerald-300 rounded"></div>
          <div className="w-3 h-3 bg-emerald-500 rounded"></div>
          <span className="text-xs">More</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[280px]">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex items-center space-x-1 mb-1">
              {week.map((day, dayIndex) => {
                const dateStr = format(day, "yyyy-MM-dd");
                const count = getCompletionCount(day);
                const intensity = getIntensity(count);
                const today = isToday(day);
                const isPast = day < new Date() && !today;

                return (
                  <div
                    key={dateStr}
                    className="relative"
                  >
                    <div
                      className={`heatmap-cell ${intensity} ${
                        today ? "ring-2 ring-emerald-500 ring-offset-1" : ""
                      }`}
                      onMouseEnter={() => setHoveredDate(dateStr)}
                      onMouseLeave={() => setHoveredDate(null)}
                      onClick={() => onSelectDate(day)}
                    />
                    {hoveredDate === dateStr && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap z-10">
                        {format(day, "MMM d")} • {count} habit{count !== 1 ? "s" : ""}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center text-sm text-gray-500">
        <p>Selected: {format(selectedDate, "MMMM d, yyyy")}</p>
      </div>
    </div>
  );
}
