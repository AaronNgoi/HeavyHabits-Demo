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
    <div>
      <Header text="TRACKER - TODAY" />
      <PageWrapper>
        {
      <div className= "px-6">
      <div className= "py-6">
        <div className= "flex justify-between">
        
          <button className="flex items-center justify-center text-lg bg-brown-add-button text-FCE3BF font-bold py-2 px-4 rounded-2xl border-brown-font border-2">
            <Link to="/habit/new">
            <span className="mr-2">
  {habits.length === 0 ? "Add Habits" :
    habits.length === 1 ? "1 Habit" : `${habits.length} Habits`}
</span>
            <img src= {AddHabitIcon} alt="Add Habit" className="h-5 w-5 inline-block"/>
              </Link>
          </button>

          <button onClick={toggleExpanded} className="flex items-center text-lg justify-center bg-FACE8F text-brown-font font-bold py-2 px-4 rounded-2xl border-brown-header-bottom border-2">
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
