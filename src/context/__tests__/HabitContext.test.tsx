import { renderHook, act } from '@testing-library/react'
import { HabitProvider, useHabits } from '../HabitContext'

describe('HabitContext', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <HabitProvider>{children}</HabitProvider>
  )

  it('initializes with empty habits array', () => {
    const { result } = renderHook(() => useHabits(), { wrapper })
    expect(result.current.habits).toEqual([])
  })

  it('adds a new habit', () => {
    const { result } = renderHook(() => useHabits(), { wrapper })

    act(() => {
      result.current.addHabit({
        name: 'Exercise',
        icon: '💪',
        color: 'bg-emerald-500',
      })
    })

    expect(result.current.habits).toHaveLength(1)
    expect(result.current.habits[0].name).toBe('Exercise')
    expect(result.current.habits[0].streak).toBe(0)
  })

  it('toggles habit completion', () => {
    const { result } = renderHook(() => useHabits(), { wrapper })
    const today = new Date().toISOString().split('T')[0]

    let habitId: string
    act(() => {
      const habit = result.current.addHabit({
        name: 'Reading',
        icon: '📚',
        color: 'bg-blue-500',
      })
      habitId = habit.id
    })

    // Toggle on
    act(() => {
      result.current.toggleHabit(habitId!, today)
    })

    expect(result.current.habits[0].completedDates).toContain(today)
    expect(result.current.habits[0].streak).toBe(1)

    // Toggle off
    act(() => {
      result.current.toggleHabit(habitId!, today)
    })

    expect(result.current.habits[0].completedDates).not.toContain(today)
    expect(result.current.habits[0].streak).toBe(0)
  })

  it('deletes a habit', () => {
    const { result } = renderHook(() => useHabits(), { wrapper })

    let habitId: string
    act(() => {
      const habit = result.current.addHabit({
        name: 'Meditate',
        icon: '🧘',
        color: 'bg-purple-500',
      })
      habitId = habit.id
    })

    expect(result.current.habits).toHaveLength(1)

    act(() => {
      result.current.deleteHabit(habitId!)
    })

    expect(result.current.habits).toHaveLength(0)
  })

  it('persists data to localStorage', () => {
    const { result } = renderHook(() => useHabits(), { wrapper })

    act(() => {
      result.current.addHabit({
        name: 'Code',
        icon: '💻',
        color: 'bg-orange-500',
      })
    })

    const stored = localStorage.getItem('habit-tracker-data')
    expect(stored).toBeTruthy()
    expect(JSON.parse(stored!)).toHaveLength(1)
  })
})
