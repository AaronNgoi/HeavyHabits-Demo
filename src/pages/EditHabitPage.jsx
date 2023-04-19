import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Header from '../Header';
import HabitForm from '../components/HabitForm';
import { useHabits } from '../context/HabitContext';
import BackIcon from '../assets/back_icon.svg';

const EditHabitPage = () => {
  const { habits, handleUpdate } = useHabits();
  const { id } = useParams();
  const habitToEdit = habits.find((habit) => habit.id === parseInt(id));
  const navigate = useNavigate();

const handleCancel = () => {
  navigate('/');
};
  
  const handleUpdateHabit = (formData) => {
    const updatedHabitData = {
      ...habitToEdit,
      habit_name: formData.habitName,
      habit_subtext: formData.habitImportance,
      repeat_days: formData.selectedDays,
      repeat_times: formData.repeatOption === 'Weekly' ? formData.timesPerWeek : null,
    };
  };

    handleUpdate(updatedHabitData);
    navigate('/');
  };

  return (
    <div>
      <Header text="EDIT HABIT" />
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
            repeatOption: habitToEdit.repeat_times ? 'Weekly' : 'Certain Days',
            repeat_times: habitToEdit.repeat_times,
            repeat_days: habitToEdit.repeat_days,
            habit_subtext: habitToEdit.habit_subtext,
          }}
          onSubmit={handleUpdateHabit}
          onCancel={handleCancel}
        />
      )}
    </div>
    </div>
  );
};

export default EditHabitPage;