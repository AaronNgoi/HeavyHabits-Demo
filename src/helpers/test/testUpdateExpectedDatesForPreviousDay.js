import updateExpectedDatesForPreviousDay from '../updateExpectedDatesForPreviousDay';
import { formatDate } from '../../utils/dateUtils';

const testUpdateExpectedDatesForPreviousDay = (today, testHabits, expectedResult) => {
  // Set the global Date object to the custom "today" date
const OriginalDate = Date;
window.Date = class extends OriginalDate {
  constructor(...args) {
    if (args.length === 0) {
      return new OriginalDate(today);
    } else {
      return new OriginalDate(...args);
    }
  }
};


  const updatedHabits = testHabits.map((testHabit) => updateExpectedDatesForPreviousDay(testHabit));
  const testResult = JSON.stringify(updatedHabits) === JSON.stringify(expectedResult);

  if (testResult) {
    console.log('All habits are updated correctly!');
  } else {
    console.log('Habits not updated correctly:');
    updatedHabits.forEach((habit) => {
      console.log(habit);
    });
  }

  // Restore the original Date object
  window.Date = OriginalDate;
};

// Test case


export default testUpdateExpectedDatesForPreviousDay;



