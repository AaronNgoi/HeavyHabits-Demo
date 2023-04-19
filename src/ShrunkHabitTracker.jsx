import React, { useState, useContext } from 'react';
import { useHabits } from './context/HabitContext';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import useDeleteConfirmation from './hooks/useDeleteConfirmation';
import { Link } from 'react-router-dom';
import HabitHeader from './components/HabitHeader';
import HabitControls from './components/HabitControls';
import HabitControlsContext from './context/HabitControlsContext';
import { formatDate } from './utils/dateUtils';


const ShrunkHabitTracker = ({ habit }) => {
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
    completed_dates[today] = true;
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
    <div className="standard-component relative flex items-center justify-between py-2 px-3">
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
      
<div className="ml-3">
  <button
    className={`complete-today-btn ${
      habit.completed_dates?.[formatDate(new Date())] === true
        ? 'completed'
        : ''
    }`}
    onClick={handleComplete}
  >
    {habit.completed_dates?.[formatDate(new Date())] === true ? '✓' : '✓'}
  </button>
</div>

    </div>
  );
};

export default ShrunkHabitTracker;