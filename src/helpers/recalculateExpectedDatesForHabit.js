import { getDayOfWeek } from './dateHelpers';
import {format} from 'date-fns';
import {formatDate} from '../utils/dateUtils';
import {formatDateDMY} from '../utils/formatDateDMY';
import { parse, isWithinInterval, startOfDay, endOfDay} from 'date-fns';

const recalculateExpectedDatesForHabit = (habit, today = new Date()) => {
  // const currentExpectedDates = habit.expected_dates;
  let newExpectedDates = {};

const habitCreatedDate = parse(habit.habit_created_date, 'dd/MM/yyyy', new Date());
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
  
  for (let date = habitCreatedDate; date.getTime() < yesterday.getTime(); date.setDate(date.getDate() + 1)) {
    const dateFormatted = formatDateDMY(date);
    const dayOfWeek = getDayOfWeek(date);
    let isExpected = false;

    if (habit.repeat_option === 'Ticked Days') {
      isExpected = habit.repeat_days.includes(dayOfWeek);
    } else if (habit.repeat_option === 'Weekly') {
      const startOfWeek = new Date(date);
      while (getDayOfWeek(startOfWeek) !== 'Monday') {
        startOfWeek.setDate(startOfWeek.getDate() - 1);
      }

      const endOfWeek = new Date(date);
      while (getDayOfWeek(endOfWeek) !== 'Sunday') {
        endOfWeek.setDate(endOfWeek.getDate() + 1);
      }

      const completed_dates = habit.completed_dates;
      let completedCount = 0;

      for (const dateStr in completed_dates) {
        if (completed_dates[dateStr]) {
          const completedDate = parse(dateStr, 'dd/MM/yyyy', new Date());
          const dateStart = startOfDay(completedDate);

          if (completedDate.getTime() <= date.getTime()) {
               const startOfWeekStart = startOfDay(startOfWeek);
               const endOfWeekEnd = endOfDay(endOfWeek);

             const withinInterval = isWithinInterval(dateStart, { start: startOfWeekStart, end: endOfWeekEnd });
             if (withinInterval) {
             completedCount++;
            }
          }
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
    expected_dates: newExpectedDates,
  };
};

export default recalculateExpectedDatesForHabit;
