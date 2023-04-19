import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import ShrunkHabitTracker from '../ShrunkHabitTracker';
import { useHabits } from '../context/HabitContext';
import AddHabitIcon from '../assets/add_habit_icon.svg';

const HomePage = () => {
  const { habits, handleDelete, handleUpdate } = useHabits();

  return (
    <div>
      <Header text="TRACKER - TODAY" />
      <div className= "px-6">
      <div className= "py-6">
        <div>
        
          <button className="flex items-center justify-center bg-brown-add-button text-FCE3BF font-bold py-2 px-4 rounded-2xl border-brown-font border-2">
            <Link to="/habit/new">
            <span className="mr-2">
  {habits.length === 0 ? "Add Habits" :
    habits.length === 1 ? "1 Habit" : `${habits.length} Habits`}
</span>
            <img src= {AddHabitIcon} alt="Add Habit" className="h-5 w-5 inline-block"/>
              </Link>
          </button>
        </div>
    </div>
        <div className="space-y-3">
      {habits.map((habit) => (
        <ShrunkHabitTracker
          key={habit.id}
          habit={habit}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ))}
      </div>
      </div>
    </div>
  );
};

export default HomePage;
