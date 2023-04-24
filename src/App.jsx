
import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../dist/output.css';
import NewHabitPage from './pages/NewHabitPage';
import EditHabitPage from './pages/EditHabitPage';
import HomePage from './pages/HomePage';
import useLocalStorage from './hooks/useLocalStorage';
import AddHistoricalRecordPage from './pages/AddHistoricalRecordPage';
import { HabitProvider } from './context/HabitContext';
import HabitControlsContext from './context/HabitControlsContext';
import updateExpectedDatesForPreviousDay from './helpers/updateExpectedDatesForPreviousDay';
// import testUpdateExpectedDatesForPreviousDay from './helpers/test/testUpdateExpectedDatesForPreviousDay';
import addIncompleteHabitForYesterday from './helpers/addIncompleteHabitForYesterday';

const App = () => {
  const [habits, setHabits] = useLocalStorage('habits', []);
  const [openedControl, setOpenedControl] = useState(null);
  
  const handleAddNewHabit = (newHabit) => {
    setHabits([...habits, newHabit]);
  };

  const handleDelete = (id) => {
    const newHabits = habits.filter((habit) => habit.id !== id);

    setHabits(newHabits);
  };

//   const today = new Date('2023-04-24T09:00:00');
// const testHabits = [
//   {
//     id: 1,
//     habit_name: 'Exercise',
//     habit_subtext: 'Workout for 30 minutes',
//     repeat_days: ['Monday', 'Wednesday', 'Friday', 'Sunday'],
//     repeat_times: '3',
//     repeat_option: 'Ticked Days',
//     habit_created_date: '15/04/2023',
//     completed_dates: {
//       '15/04/2023': true,
//       '16/04/2023': false,
//       '17/04/2023': true,
//       '18/04/2023': false,
//       '19/04/2023': false,
//     },
//     expected_dates: {
//       '15/04/2023': false,
//       '16/04/2023': false,
//       '17/04/2023': true,
//       '18/04/2023': false,
//     },
//   },
//   {
//     id: 2,
//     habit_name: 'Meditate',
//     habit_subtext: 'Meditate for 10 minutes',
//     repeat_days: ['Tuesday', 'Thursday', 'Saturday'],
//     repeat_times: '3',
//     repeat_option: 'Ticked Days',
//     habit_created_date: '15/04/2023',
//     completed_dates: {
//       '15/04/2023': false,
//       '16/04/2023': true,
//       '17/04/2023': true,
//       '18/04/2023': true,
//       '19/04/2023': true,
//     },
//     expected_dates: {
//       '15/04/2023': true,
//       '16/04/2023': false,
//       '17/04/2023': false,
//       '18/04/2023': true,
//     },
//   },
//   {
//     id: 3,
//     habit_name: 'Read',
//     habit_subtext: 'Read 20 pages',
//     repeat_days: [],
//     repeat_times: '4',
//     repeat_option: 'Weekly',
//     habit_created_date: '15/04/2023',
//     completed_dates: {
//       '15/04/2023': false,
//       '16/04/2023': true,
//       '17/04/2023': true,
//       '18/04/2023': true,
//       '19/04/2023': true,
//     },
//     expected_dates: {
//       '15/04/2023': false,
//       '16/04/2023': false,
//       '17/04/2023': true,
//       '18/04/2023': true,
//     },
//   },
//   {
//     id: 4,
//     habit_name: 'Journal',
//     habit_subtext: 'Write about your day',
//     repeat_days: [],
//     repeat_times: '6',
//     repeat_option: 'Weekly',
//     habit_created_date: '15/04/2023',
//     completed_dates: {
//       '15/04/2023': false,
//       '16/04/2023': true,
//       '17/04/2023': false,
//       '18/04/2023': false,
//       '19/04/2023': false,
//     },
//     expected_dates: {
//       '15/04/2023': false,
//       '16/04/2023': false,
//       '17/04/2023': false,
//       '18/04/2023': true,
//     },
//   },
// ];

// const expectedResult = [
//   // ...your expected result
// ];

// testUpdateExpectedDatesForPreviousDay(today, testHabits, expectedResult);

  const handleUpdate = (updatedHabit, completionDate) => {
    if (completionDate) {
      updatedHabit.completion_dates.push(completionDate);
    }
    const newHabits = habits.map((habit) =>
      habit.id === updatedHabit.id ? updatedHabit : habit
    );
    setHabits(newHabits);
  };

  // This function updates expected_dates for previous day.
    const updateHabits = () => {
  const updatedHabits = habits.map( habit => {
    habit = updateExpectedDatesForPreviousDay(habit);
    habit = addIncompleteHabitForYesterday(habit);
    return habit;
    });
  setHabits(updatedHabits);
};

  useEffect(() => {
  const updateAtMidnight = () => {
    const now = new Date();
    const nextDay = new Date(now);
    nextDay.setDate(nextDay.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0);
    const timeUntilMidnight = nextDay.getTime() - now.getTime();
    return timeUntilMidnight;
  };

  updateHabits(); // Call the updateHabits function when the component mounts
  const timeoutId = setTimeout(() => {
    updateHabits();
    setInterval(updateHabits, 24 * 60 * 60 * 1000); // Call updateHabits every 24 hours (every new day)
  }, updateAtMidnight());

  return () => clearTimeout(timeoutId); // Clean up the timeout when the component is unmounted
}, []);

  return (
    <HabitProvider value={{ habits, handleAddNewHabit, handleDelete, handleUpdate }}>
    <HabitControlsContext.Provider value={{ openedControl, setOpenedControl}}>
      <Router>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage/>} />
            <Route path="/habit/new" element={<NewHabitPage />} />
            <Route path="/habit/:id/edit" element={<EditHabitPage />} />
            <Route path="/habit/:id/addRecord" element={<AddHistoricalRecordPage />} />
          </Routes>
        </div>
      </Router>
      </HabitControlsContext.Provider>
    </HabitProvider>
  );
};

export default App;
