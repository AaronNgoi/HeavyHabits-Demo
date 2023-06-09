import React, { useState } from 'react';
import { useHabits } from '../context/HabitContext';
import AddHistoricalRecordIcon from '../assets/add_historical_record.svg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/dateUtils';
import recalculateHistoricalExpectedDates from '../helpers/recalculateHistoricalExpectedDates';

const AddHistoricalRecord = ({ habitId }) => {
  const { habits, handleUpdate } = useHabits();
  const navigate = useNavigate();
  const habit = habits.find((h) => h.id === habitId);

  if (!habit) {
    return <div>Habit not found</div>;
  }

  const habitCreatedDate = new Date(habit.habit_created_date);

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const [selectedDate, setSelectedDate] = useState(yesterday);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


  // TESTING ONLY --- 
const habitCreatedDate1 = new Date();

// Subtract 2 months from the habitCreatedDate for testing purposes
const twoMonthsAgo = new Date(habitCreatedDate1);
twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
const habitCreatedDateAdjusted = twoMonthsAgo;


  

const handleSubmit = () => {
  console.log("AddHistoricalRecord handleSubmit called");
  const formattedDate = formatDate(selectedDate);

  // Check if the date is not already completed
  if (!habit.completed_dates || habit.completed_dates[formattedDate] !== true) {
    const updatedHabit = {
      ...habit,
      completed_dates: {
        ...(habit.completed_dates || {}),
        [formattedDate]: true,
      },
    };

    // Recalculate the expected dates for the updated habit
    const updatedExpectedDates = recalculateHistoricalExpectedDates(updatedHabit, selectedDate);
    updatedHabit.expected_dates = updatedExpectedDates.expected_dates;
    
    handleUpdate(updatedHabit);
    setSuccessMessage(`Record has been added on ${formattedDate}`);
  } else {
    setSuccessMessage(`Record for ${formattedDate} has already been added`);
  }
  navigate('/');
};



  return (
    <div className="standard-component p-8 text-lg flex flex-col gap-4 shadow-md drop-shadow-md  pb-8">
      <div className="standard-page flex items-center">
        <img src={AddHistoricalRecordIcon} alt="Add Record" />
        <p className="ml-4">Add Record for {habit.habit_name}</p>
      </div>
      <p> When?</p>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        minDate={new Date(habitCreatedDateAdjusted.getTime() - 3 * 24 * 60 * 60 * 1000)}
        maxDate={yesterday}
        filterDate={(date) => date >= habitCreatedDateAdjusted}
        className="w-full"
      />
      <div className="flex justify-between">
      <button onClick={handleSubmit} className="flex items-center justify-center bg-green text-FCE3BF text-biege-form-colour py-2 px-4 rounded-3xl w-full">Save</button>
      <button onClick={() => navigate('/')} className="flex items-center justify-center bg-red text-FCE3BF text-biege-form-colour py-2 px-4 rounded-3xl w-full ml-4">Cancel</button>
    </div>
      </div>
  );
};

export default AddHistoricalRecord;