import { getDayOfWeek } from './dateHelpers';
import {format} from 'date-fns';
import {formatDate} from '../utils/dateUtils';
import {formatDateDMY} from '../utils/formatDateDMY';
import { parse, isWithinInterval, startOfDay, endOfDay} from 'date-fns';

const updateExpectedDatesForPreviousDay = (habit, today = new Date()) => {
  console.log('Current time:', new Date());
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  
const yesterdayFormatted = formatDateDMY(yesterday)

  const dayOfWeek = getDayOfWeek(yesterday);
  let isExpected = false;

  if (habit.repeat_option === 'ticked days') {
    isExpected = habit.repeat_days.includes(dayOfWeek);
  } else if (habit.repeat_option === 'weekly') {
    const startOfWeek = new Date(yesterday);
    while (getDayOfWeek(startOfWeek) !== 'Monday') {
      startOfWeek.setDate(startOfWeek.getDate() - 1);
    }

    const endOfWeek = new Date(startOfWeek);
        while (getDayOfWeek(endOfWeek) !== 'Sunday') {
      endOfWeek.setDate(endOfWeek.getDate() + 1);
        }

    const startFormatted = formatDateDMY(startOfWeek);
    const endFormatted = formatDateDMY(endOfWeek);

    const currentDate = new Date();
    const dayOfWeek1 = currentDate.getDay();
    const adjustedDayOfWeek = dayOfWeek1 === 0 ? 7 : dayOfWeek1;
    const remainingDays = (7 - adjustedDayOfWeek) + 1;

        const completed_dates = habit.completed_dates;
    let completedCount = 0;

  for (const dateStr in completed_dates) {
      if (completed_dates[dateStr]) {
    const date = parse(dateStr, 'dd/MM/yyyy', new Date());
    const dateStart = startOfDay(date);
    const startOfWeekStart = startOfDay(startOfWeek);
    const endOfWeekEnd = endOfDay(endOfWeek);

        const withinInterval = isWithinInterval(dateStart, { start: startOfWeekStart, end: endOfWeekEnd });
          if (withinInterval) {
            completedCount++;   
    }
  }
}

    isExpected = ((remainingDays - parseInt(habit.repeat_times)) + completedCount < 0) ||
             (!!habit.completed_dates[yesterdayFormatted] && completedCount <= parseInt(habit.repeat_times));
  }

  return {
    ...habit,
    expected_dates: {
      ...habit.expected_dates,
      [yesterdayFormatted]: isExpected,
    },
  };
};

export default updateExpectedDatesForPreviousDay;