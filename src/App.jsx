import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import '../dist/output.css';
import NewHabitPage from './pages/NewHabitPage';
import EditHabitPage from './pages/EditHabitPage';
import HomePage from './pages/HomePage';
import useLocalStorage from './hooks/useLocalStorage';
import AddHistoricalRecordPage from './pages/AddHistoricalRecordPage';
import ReorderHabitsPage from './pages/ReorderHabitsPage';
import { HabitProvider } from './context/HabitContext';
import HabitControlsContext from './context/HabitControlsContext';
import updateExpectedDatesForPreviousDay from './helpers/updateExpectedDatesForPreviousDay';
// import testUpdateExpectedDatesForPreviousDay from './helpers/test/testUpdateExpectedDatesForPreviousDay';
import addIncompleteHabitForYesterday from './helpers/addIncompleteHabitForYesterday';
// import addMissingEntriesForAllDates from './helpers/addMissingEntriesForAllDates';
import PetDisplay from './PetDisplay';
import Header from './Header';

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

  const handleUpdate = (updatedHabit) => {
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
    <HabitProvider value={{ habits, handleAddNewHabit, handleDelete, handleUpdate, setHabits }}>
    <HabitControlsContext.Provider value={{ openedControl, setOpenedControl}}>
     <canvas id="canvas" style={{position: 'fixed', top: '0px', left: '0px', pointerEvents: 'none', zIndex: 100, height: '100vh', width: '100%'}}></canvas>
      <Router>
        <div className="App">
          {/* <Header text='TRACKER - TODAY'></Header> */}
          <div className="bg-brown-pet-bg relative h-44"> </div>
        <PetDisplay></PetDisplay>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage/>} />
            <Route path="/habit/new" element={<NewHabitPage />} />
            <Route path="/habit/:id/edit" element={<EditHabitPage />} />
            <Route path="/habit/:id/addRecord" element={<AddHistoricalRecordPage />} />
            <Route path="/reorderHabits" element={<ReorderHabitsPage />} />
          </Routes>
        </div>
      </Router>
      </HabitControlsContext.Provider>
    </HabitProvider>
  );
};

export default App;
