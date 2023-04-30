import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header';
import HabitForm from '../components/HabitForm';
import { useHabits } from '../context/HabitContext';
import BackIcon from '../assets/back_icon.svg';
import {formatDate} from '../utils/dateUtils';
import PageWrapper from '../components/PageWrapper';

const NewHabitPage = () => {
  const { handleAddNewHabit } = useHabits();
  const navigate = useNavigate();

const handleNewHabitSubmit = (formData) => {
  const habitData = {
    id: new Date().getTime(),
    habit_name: formData.habitName,
    habit_subtext: formData.habitImportance,
    repeat_option: formData.repeat_option,
    repeat_days: formData.repeat_option === 'Ticked Days' ? formData.tickedDays : null,
    repeat_times: formData.repeat_option === 'Weekly' ? formData.timesPerWeek : null,
    habit_created_date: formatDate(new Date()),
    completed_dates: {},
    expected_dates: {},
  };

  // Save the habit data to the database, e.g., using the handleAddNewHabit function from HabitContext
  handleAddNewHabit(habitData);

  // Navigate to the main menu
  navigate('/');
};

  return (
    <div>
      <Header text="NEW HABIT" />
            <PageWrapper>
        {
      <div className="px-6">
      <div className="pt-3 pb-6">
        
          <button className="flex items-center justify-center text-lg bg-brown-add-button text-FCE3BF font-bold py-2 px-4 border-brown-font border-2 rounded-22px">
        <Link to="/">    
          <img src= {BackIcon} alt="Back" className="h-5 w-5 inline-block"/>
          <span className="ml-2">Back</span>
        </Link>  
          </button>
        
      </div>
      <HabitForm onSubmit={handleNewHabitSubmit} />
    </div>
        }
      </PageWrapper>
    </div>
  );
};

export default NewHabitPage;
