import React, { useState, useContext } from 'react';
import { useHabits } from './context/HabitContext';
import useDeleteConfirmation from './hooks/useDeleteConfirmation';
import HabitHeader from './components/HabitHeader';
import HabitControls from './components/HabitControls';
import HabitControlsContext from './context/HabitControlsContext';
import { formatDate } from './utils/dateUtils';
import ExpandedHabitInfo from './components/ExpandedHabitInfo';
import summonConfetti from './helpers/summonConfetti';


const ShrunkHabitTracker = ({ habit, expanded }) => {
  const { handleDelete, handleUpdate } = useHabits();
  const { openedControl, setOpenedControl } = useContext(HabitControlsContext);
  
  const {
    showDeleteConfirmation,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDeleteModalClose,
  } = useDeleteConfirmation(() => handleDelete(habit.id));

  
const handleComplete = () => {
  const completed_dates = habit.completed_dates || {};
  const today = formatDate(new Date());

  if (!completed_dates[today]) {
    const idAsString = String(habit.id);
    const button = document.getElementById(`button-${idAsString}`);
    button.disabled = true;
    button.classList.add('loading');
    setTimeout(() => {
    summonConfetti(idAsString);
    button.disabled = false;
    button.classList.remove('loading');
    completed_dates[today] = true
    handleUpdate({ ...habit, completed_dates })
    }, 1600);
  } else {
    delete completed_dates[today];
  }

  handleUpdate({ ...habit, completed_dates });
};

const isCompleted = habit.completed_dates?.[new Date().toISOString().split("T")[0]] === true;


  const handleEditClick = () => {
  };

  const handleAddRecordClick = () => {
  };

  return (
    <div className="standard-component relative flex flex-col items-stretch py-2 px-2">
      <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="-mr-1">
        <HabitControls
          habit={habit}
          openedControl={openedControl}
          setOpenedControl={setOpenedControl}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
          handleAddRecordClick={handleAddRecordClick}
        />
          </div>
        <HabitHeader habitName={habit.habit_name} habitSubtext={habit.habit_subtext}/>
      </div>
<div className="">
  <button id={`button-${habit.id}`}
    className={` flex justify-center complete-today-btn rounded-19px m-1 ${
      habit.completed_dates?.[formatDate(new Date())] === true
        ? 'completed'
        : ''
 }`}
    onClick={() => {
  handleComplete();
    }}
  >
    {habit.completed_dates?.[formatDate(new Date())] === true ? '✓' : '✓'}
   <div className="absolute message loadingMessage h-10 w-10">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" className="h-10 w-10">
      <circle className="loadingCircle" cx="11" cy="28" r="2"/>
      <circle className="loadingCircle" cx="20" cy="28" r="2"/>
      <circle className="loadingCircle" cx="29" cy="28" r="2"/>
    </svg>
  </div>
</button>
</div>
    </div>
      {expanded && <ExpandedHabitInfo habit = {habit} />}
    </div>    
  );
};

export default ShrunkHabitTracker;