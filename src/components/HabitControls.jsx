import React, { useState, useContext, useRef, useEffect } from 'react';
import { useHabits } from '../context/HabitContext';
import { Link } from 'react-router-dom';
import EditIcon from '../assets/Edit.svg';
import DeleteIcon from '../assets/Delete.svg';
import AddHistoricalRecordIcon from '../assets/add_historical_record.svg';
import OptionsIcon from '../assets/options.svg';
import DeleteConfirmationModal from '../DeleteConfirmationModal';
import useDeleteConfirmation from '../hooks/useDeleteConfirmation';
import HabitControlsContext from '../context/HabitControlsContext';

const HabitControls = ({ habit, handleEditClick, handleAddRecordClick}) => {
  const { handleDelete } = useHabits();
  const { openedControl, setOpenedControl } = useContext(HabitControlsContext);

  const generateMenuRef = (habitId) => {
  return `menuRef_${habitId}`;
};

  const menuRef = useRef(generateMenuRef(habit.id));

  const toggleOptions = () => {
    if (openedControl === habit.id) {
      setOpenedControl(null);
    } else {
      setOpenedControl(habit.id);
    }
  };

  const {
    showDeleteConfirmation,
    handleDeleteModalClick,
    handleDeleteConfirm,
    handleDeleteModalClose,
  } = useDeleteConfirmation(() => handleDelete(habit.id));

    useEffect(() => {
const handleClickOutside = (event) => {

  if (
    openedControl === habit.id &&
    menuRef.current &&
    menuRef.current.id === generateMenuRef(habit.id) &&
    !menuRef.current.contains(event.target)
  ) {
    setOpenedControl(null);
  }
};

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openedControl]);

  
  return (
    <div id={generateMenuRef(habit.id)} ref={menuRef} className="flex justify-center">
      <button onClick={toggleOptions} className="">
        <img src={OptionsIcon} alt="More options" className="ml-1 h-9 w-9 hover:scale-105 active:scale-110" />
      </button>
      {openedControl === habit.id && (
        <div className="absolute left-1 top-12 z-10">
        <div className="px-1 py-1 rounded-22px bg-biege-drop-down shadow-md drop-shadow-md  flex flex-col border-2 border-brown-border">
          <Link to={`/habit/${habit.id}/edit`} className="flex items-center rounded-2xl hover:bg-biege-display active:bg-biege-display">
            <button className="ml-2 mr-2 my-3 px-2 inline-flex items-center ">
              <img src={EditIcon} alt="Edit" className="" />
              <span className= "pl-3 font-bold">Edit</span>
            </button>
          </Link>
          <div onClick={handleDeleteModalClick} className=" rounded-2xl hover:bg-biege-display active:bg-biege-display cursor-pointer">
          <button className="ml-2 mr-2 my-3 px-2 flex items-center">
            <img src={DeleteIcon} alt="Delete" />
            <span className= "pl-3 font-bold">Delete</span>
          </button>
          </div>
          <Link to={`/habit/${habit.id}/addRecord`} state={{ habitId: habit.id }} className="flex items-center rounded-2xl hover:bg-biege-display active:bg-biege-display">
            <button onClick={handleAddRecordClick} className="ml-2 mr-2 my-3 px-2 inline-flex items-center">
              <img src={AddHistoricalRecordIcon} alt="Add Historical Record" />
              <span className= "pl-3 font-bold">Add Record</span>
            </button>
          </Link>
        </div>
        </div>
      )}
      {showDeleteConfirmation && (
        <DeleteConfirmationModal
          habitName={habit.habitName}
          onDelete={handleDeleteConfirm}
          onClose={handleDeleteModalClose}
        />
      )}
    </div>
  );
};

export default HabitControls;
