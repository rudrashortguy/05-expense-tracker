import { render, screen } from '@testing-library/react'
import Home from '../page'
import { HabitProvider } from '@/context/HabitContext'

describe('Home Page', () => {
  it('renders the page title', () => {
    render(
      <HabitProvider>
        <Home />
      </HabitProvider>
    )

    expect(screen.getByText(/Habit Tracker/i)).toBeInTheDocument()
  })

  it('shows empty state when no habits', () => {
    render(
      <HabitProvider>
        <Home />
      </HabitProvider>
    )

    expect(screen.getByText(/Start Building Good Habits/i)).toBeInTheDocument()
    expect(screen.getByText(/Add your first habit/i)).toBeInTheDocument()
  })

  it('displays Add Habit button', () => {
    render(
      <HabitProvider>
        <Home />
      </HabitProvider>
    )

    expect(screen.getByText('Add New Habit')).toBeInTheDocument()
  })
})
