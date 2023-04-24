import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../Header';
import HabitForm from '../components/HabitForm';
import { useHabits } from '../context/HabitContext';
import BackIcon from '../assets/back_icon.svg';
import recalculateExpectedDatesForHabit from '../helpers/recalculateExpectedDatesForHabit';
import PageWrapper from '../components/PageWrapper';

const EditHabitPage = () => {
  const { habits, handleUpdate } = useHabits();
  const { id } = useParams();
  const habitToEdit = habits.find((habit) => habit.id === parseInt(id));
  const navigate = useNavigate();

const handleCancel = () => {
  navigate('/');
};
  
const handleUpdateHabit = (formData) => {
  let updatedTimesPerWeek = formData.timesPerWeek;
  if (formData.repeat_option === 'Weekly' && !updatedTimesPerWeek.length) {
    updatedTimesPerWeek = "1"; // Set default value to 1 if timesPerWeek is an empty array
  }
  
  const updatedHabitData = {
    ...habitToEdit,
    habit_name: formData.habitName,
    habit_subtext: formData.habitImportance,
    repeat_option: formData.repeat_option,
    repeat_days: formData.repeat_option === 'Ticked Days' ? formData.tickedDays : [],
    repeat_times: formData.repeat_option === 'Weekly' ? updatedTimesPerWeek : [],
  };

  const relevantProperties = ['repeat_option', 'repeat_days', 'repeat_times'];
  const hasChanged = relevantProperties.some(prop => habitToEdit[prop] !== updatedHabitData[prop]);
  
  if (hasChanged) {
    const habitWithRecalculatedExpectedDates = recalculateExpectedDatesForHabit(updatedHabitData);
    
    handleUpdate(habitWithRecalculatedExpectedDates);
    // Save/update the habitWithRecalculatedDates to your data store
    navigate('/');
  } else {
    handleUpdate(updatedHabitData);
    navigate('/');
  }
};


  return (
    <div>
      <Header text="EDIT HABIT" />
            <PageWrapper>
        {
      <div className="px-6">
      <div className="py-4">
        
          <button className="flex items-center justify-center bg-brown-add-button text-FCE3BF font-bold py-2 px-4 rounded-2xl border-brown-font border-2">
        <Link to="/">    
          <img src= {BackIcon} alt="Back" className="h-5 w-5 inline-block"/>
          <span className="ml-2">Back</span>
        </Link>  
          </button>
        
      </div>
      {habitToEdit && (
        <HabitForm
          initialValues={{
            habit_name: habitToEdit.habit_name,
            repeat_option: habitToEdit.repeat_option,
            repeat_times: habitToEdit.repeat_times,
            repeat_days: habitToEdit.repeat_days,
            habit_subtext: habitToEdit.habit_subtext,
          }}
          onSubmit={handleUpdateHabit}
          onCancel={handleCancel}
        />
      )}
    </div>
        }
     </PageWrapper>
    </div>
  );
};

export default EditHabitPage;