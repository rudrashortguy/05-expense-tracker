export interface Habit {
  id: string;
  name: string;
  icon: string;
  color: string;
  completedDates: string[];
  streak: number;
  createdAt: string;
}

export type ColorScheme =
  | "emerald"
  | "blue"
  | "purple"
  | "pink"
  | "orange"
  | "teal";

export interface HeatmapData {
  date: string;
  count: number;
  habits: string[];
}
