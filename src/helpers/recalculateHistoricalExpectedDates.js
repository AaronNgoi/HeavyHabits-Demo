import { getDayOfWeek } from './dateHelpers';
import {formatDateDMY} from '../utils/formatDateDMY';
import { parse, startOfDay, endOfDay} from 'date-fns';

const recalculateHistoricalExpectedDates = (habit, completionDate, today = new Date()) => {
  const habitCreatedDate = parse(habit.habit_created_date, 'dd/MM/yyyy', new Date());
  const startOfWeek = new Date(completionDate);
  while (getDayOfWeek(startOfWeek) !== 'Monday') {
    startOfWeek.setDate(startOfWeek.getDate() - 1);
  }
  const endOfWeek = new Date(completionDate);
  while (getDayOfWeek(endOfWeek) !== 'Sunday') {
    endOfWeek.setDate(endOfWeek.getDate() + 1);
  }

  let newExpectedDates = {};
  let completedCount = 0;

  for (let date = startOfWeek; date.getTime() <= endOfWeek.getTime(); date.setDate(date.getDate() + 1)) {
    const dateFormatted = formatDateDMY(date);
    const dayOfWeek = getDayOfWeek(date);
    let isExpected = false;

     // Added this in to fix historical habits calculating over toda's date. text next week  
      if (date.getTime() > today.getTime()) {
      break;
    }

    
    if (habit.repeat_option === 'Ticked Days') {
      isExpected = habit.repeat_days.includes(dayOfWeek);
    } else if (habit.repeat_option === 'Weekly') {
      const completed_dates = habit.completed_dates;

      for (let loopDate = new Date (startOfWeek); loopDate.getTime() <= date.getTime(); loopDate.setDate(loopDate.getDate() + 1)) {
        const loopDateFormatted = formatDateDMY(loopDate);
        if (completed_dates[loopDateFormatted]) {
          completedCount++;
        }
      }
      
      const dayOfWeek1 = date.getDay();
      const adjustedDayOfWeek = dayOfWeek1 === 0 ? 7 : dayOfWeek1;

      const remainingDays = (7 - adjustedDayOfWeek);
      
      isExpected = ((remainingDays - parseInt(habit.repeat_times)) + completedCount < 0) ||
        (!!habit.completed_dates[dateFormatted] && completedCount <= parseInt(habit.repeat_times));
    }

    newExpectedDates[dateFormatted] = isExpected;
  }
  return {
    ...habit,
    expected_dates: {
      ...habit.expected_dates,
      ...newExpectedDates,
    },
  };
};

export default recalculateHistoricalExpectedDates; 