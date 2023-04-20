
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
  const updatedHabits = habits.map(updateExpectedDatesForPreviousDay);
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
