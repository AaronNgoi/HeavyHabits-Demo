function calculateStreak(habit) {
  const completedDates = habit.completed_dates;
  const expectedDates = habit.expected_dates;
  let currentStreak = 0;

  for (const date in completedDates) {
    if (completedDates[date]) {
      currentStreak++;
    } else if (expectedDates[date]) {
      currentStreak = 0;
    }
  }

  return currentStreak;
}

export default calculateStreak;