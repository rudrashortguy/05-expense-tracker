# Habit Tracker

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A beautiful, production-ready habit tracking application built with Next.js 14, TypeScript, and Tailwind CSS. Track your daily habits with visual streaks and an activity heatmap, all persisted locally in your browser.

## Features

- 🎯 **Habit Management**: Create, edit, and delete habits with custom icons and colors
- 🔥 **Streak Tracking**: Automatic streak calculation with visual indicators
- 📊 **Activity Heatmap**: GitHub-style contribution graph showing your consistency
- 💾 **Local Storage**: All data persists in browser localStorage (no accounts required)
- 📱 **Responsive Design**: Optimized for mobile and desktop
- ⚡ **Real-time Updates**: Instant feedback with optimistic updates
- 🎨 **Customizable**: Choose icons and colors for each habit
- 📈 **Statistics Dashboard**: Track total habits, active streaks, and progress

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API with localStorage persistence
- **Icons**: Inline SVG + Emoji
- **Date Handling**: date-fns

## Getting Started

### Prerequisites

- Node.js 18.18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rudrashortguy/01-habit-tracker.git
cd 01-habit-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Usage

1. **Add a Habit**: Click "Add New Habit" and fill in the details
2. **Track Progress**: Click the circle next to each habit to mark it complete for today
3. **View Heatmap**: See your activity pattern over the last 12 weeks
4. **Monitor Streaks**: Watch your streaks grow with visual indicators

## Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout with provider
│   ├── page.tsx        # Main dashboard
│   └── globals.css     # Global styles
├── components/
│   ├── AddHabit.tsx    # Habit creation form
│   ├── HabitList.tsx   # List of habits
│   ├── HabitItem.tsx   # Individual habit row
│   ├── Heatmap.tsx     # Activity heatmap
│   └── Header.tsx      # App header
├── context/
│   └── HabitContext.tsx # State management
└── types/
    └── index.ts        # TypeScript definitions
```

## Screenshots

### Desktop View
```
┌─────────────────────────────────────────────────────────┐
│  ✓  Habit Tracker                                    │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────────────────┐  ┌───────────────────┐  │
│  │ Your Habits              │  │ Activity Heatmap  │  │
│  │                          │  │                   │  │
│  │ ○ 🏋️ Exercise (12 days)  │  │ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │  │
│  │ ✓ 📚 Reading (5 days)    │  │ ▓▓▓░░░▓▓▓▓▓▓▓▓   │  │
│  │ ○ 💧 Water (3 days)      │  │                   │  │
│  └──────────────────────────┘  └───────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## Roadmap

- [ ] Habit categories and tagging
- [ ] Reminder notifications
- [ ] Weekly/monthly goals
- [ ] Export/import data
- [ ] Dark mode toggle
- [ ] Habit analytics and insights
- [ ] Social features (share achievements)

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with Next.js 14 App Router
- Inspired by GitHub's contribution graph
- Icons from Feather and Emojis
