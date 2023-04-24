import { formatDateDMY } from "../utils/formatDateDMY";

const addIncompleteHabitForYesterday = (habit) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayFormatted = formatDateDMY(yesterday)
  
  if (!habit.completed_dates[yesterdayFormatted]) {
    habit.completed_dates[yesterdayFormatted] = false;
  }
  return habit;
};

export default addIncompleteHabitForYesterday;