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
    const completion_dates = habit.completion_dates || [];
    const today = formatDate(new Date());
    
    if (!completion_dates.includes(today)) {
      completion_dates.push(today);
    } else {
      const index = completion_dates.indexOf(today);
      completion_dates.splice(index, 1);
    }
  
    handleUpdate({ ...habit, completion_dates });
  };

  const isCompleted = habit.completion_dates?.includes(
    new Date().toISOString().split("T")[0]
  );

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
            habit.completion_dates?.includes(
              formatDate(new Date())
              )
              ? 'completed'
              : ''
          }`}
          onClick={handleComplete}
        >
          {habit.completion_dates?.includes(
              formatDate(new Date())
              )
            ? '✓'
            : '✓'}
        </button>
      </div>
    </div>
  );
};

export default ShrunkHabitTracker;