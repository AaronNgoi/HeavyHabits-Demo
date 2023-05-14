import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useHabits } from '../context/HabitContext';
import ReorderIcon from '../assets/Regroup.svg';
import BackIcon from '../assets/back_icon.svg';
import SaveIcon from '../assets/save.svg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ReorderHabits() {
  const { habits, setHabits } = useHabits();
  const [tempHabits, setTempHabits] = useState(habits);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const navigate = useNavigate();
  
  function handleDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

        if (startIndex === endIndex) {
      return;  
    }
    const newTempHabits = [...tempHabits];
    const [removed] = newTempHabits.splice(startIndex, 1);
    newTempHabits.splice(endIndex, 0, removed);
    setTempHabits(newTempHabits);
    setShowSaveButton(true);
  }

  function handleSave() {
    setHabits(tempHabits);
    navigate('/');
  }
  
  return (
          <div className="px-3">
      <div className="px-3 pt-3 pb-3 flex justify-between items-center">
        
          <button className="flex items-center justify-center text-lg bg-brown-add-button text-FCE3BF font-bold py-2 px-4 border-brown-font border-2 rounded-22px shadow-press-brown-button active:bg-brown-button-press active:translate-y-2px active:shadow-none transition-all duration-100 hover:bg-brown-button-presss">
        <Link to="/">    
          <img src= {BackIcon} alt="Back" className="h-5 w-5 inline-block"/>
          <span className="ml-2">Back</span>
        </Link>  
          </button>

        {!showSaveButton && <span className="flex font-bold pl-3 text-lg text-right">Drag to reorder habits</span>}
        {showSaveButton && (
          <button className="flex items-center justify-center text-lg bg-green text-FCE3BF font-bold py-2 px-4 border-green-border border-2 rounded-22px shadow-press-green-button active:bg-dark-green active:translate-y-2px active:shadow-none transition-all duration-100 hover:bg-dark-green" onClick={handleSave}>
          <img src= {SaveIcon} alt="Save" className="h-5 w-5 inline-block"/>
          <span className="ml-2">SAVE</span>
          </button>
        )}
        </div>
      
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="habits" type="group">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef} className="px-3 py-3 space-y-3 active:bg-biege-drop-down rounded-3xl">
            {tempHabits.map((habit, index) => (
              <Draggable key={habit.id.toString()} draggableId={habit.id.toString()} index={index}>
                {(provided) => (
                  <li 
                    ref={provided.innerRef}       
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="standard-component flex items-center py-2 px-2  active:bg-green-clicked active:text-FCE3BF active:border-green-border hover:scale-105"
                    >
                    <div className="flex items-center justify-center h-10 w-10 m-1">
                    <img src={ReorderIcon} alt="Reorder Icon" className=" flex h-6 w-6 stroke-white" />
                    </div>
                    <div className="text-xl font-bold">{habit.habit_name}</div>
                 
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
   </div>
  );
}

export default ReorderHabits;