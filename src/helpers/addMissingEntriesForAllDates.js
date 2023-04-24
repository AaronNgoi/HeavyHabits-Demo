import { formatDateDMY } from "../utils/formatDateDMY";

const addMissingEntriesForAllDates = (habits) => {
  const updatedHabits = habits.map((habit) => {
    const habitCreatedDate = new Date(habit.habit_created_date.split('/').reverse().join('-'));
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    for (let currentDate = habitCreatedDate; currentDate <= yesterday; currentDate.setDate(currentDate.getDate() + 1)) {
      const formattedDate = formatDateDMY(currentDate);
      if (!habit.completed_dates[formattedDate]) {
        habit.completed_dates[formattedDate] = false;
      }
    }

    return habit;
  });

  return updatedHabits;
};

export default addMissingEntriesForAllDates;