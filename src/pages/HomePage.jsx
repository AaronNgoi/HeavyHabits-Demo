import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import ShrunkHabitTracker from '../ShrunkHabitTracker';
import { useHabits } from '../context/HabitContext';
import AddHabitIcon from '../assets/add_habit_icon.svg';
import PageWrapper from '../components/PageWrapper';
import ShrinkIcon from '../assets/Shrink.svg';
import ExpandIcon from '../assets/Expand.svg';

const HomePage = () => {
  const { habits, handleDelete, handleUpdate } = useHabits();
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
  setExpanded(!expanded);
};
  
  
  return (
    <div className="">
      <Header text="TRACKER - TODAY" />
      <PageWrapper>
        {
      <div className= "px-6">
      <div className= "pt-3 pb-6">
        <div className= "flex justify-between">
        
          <button className="flex items-center justify-center text-lg bg-brown-add-button text-FCE3BF py-2 px-4 rounded-22px border-brown-font border-2  shadow-press-brown-button active:bg-brown-button-press active:translate-y-2px active:shadow-none transition-all duration-100 hover:bg-brown-button-press">
            <Link to="/habit/new">
            <span className="mr-2">
  {habits.length === 0 ? "Add Habits" :
    habits.length === 1 ? "1 Habit" : `${habits.length} Habits`}
</span>
            <img src= {AddHabitIcon} alt="Add Habit" className="h-5 w-5 inline-block"/>
              </Link>
          </button>

          {habits.length > 0 && (
          <button onClick={toggleExpanded} className="flex items-center text-lg justify-center bg-orange-button text-brown-font py-2 px-4 rounded-22px border-brown-component rounded-22px border-2 shadow-press-orange-button active:bg-orange-button-click active:translate-y-2px active:shadow-none transition-all duration-100 hover:bg-orange-button-click">
              {expanded ? (
    <>
      <img src={ShrinkIcon} alt="Shrink Icon" className="h-5 w-5 inline-block"/>
      <span className="ml-3 mr-1">Shrink</span>
    </>
  ) : (
    <>
      <img src={ExpandIcon} alt="Expand Icon" className="h-5 w-5 inline-block"/>
      <span className="ml-2">Expand</span>
    </>
  )}    
          </button>
        )}
          
        </div>
    </div>
        <div className="space-y-3">
      {habits.map((habit) => (
        <ShrunkHabitTracker
          key={habit.id}
          habit={habit}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          expanded={expanded}
        />
      ))}
      </div>
      </div>
        }
      </PageWrapper>
    </div>
  );
};

export default HomePage;
