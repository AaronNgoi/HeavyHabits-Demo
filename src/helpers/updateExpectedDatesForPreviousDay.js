import { getDayOfWeek } from './dateHelpers';
import {formatDate} from '../utils/dateUtils';

const updateExpectedDatesForPreviousDay = (habit) => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayFormatted = formatDate(yesterday);

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
    endOfWeek.setDate(endOfWeek.getDate() + 6);

    const startFormatted = formatDate(startOfWeek);
    const endFormatted = formatDate(endOfWeek);

    let completedCount = 0;
    for (let date in habit.completed_dates) {
      if (date >= startFormatted && date <= endFormatted && habit.completed_dates[date]) {
        completedCount++;
      }
    }

    isExpected = habit.repeat_times - completedCount > 0;
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