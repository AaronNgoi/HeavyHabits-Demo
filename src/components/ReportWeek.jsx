import React, { useState } from 'react';
import MonthIcon from '../assets/monthIcon.svg';
import { Link } from 'react-router-dom';
import CircleDateDisplay from '../utils/circleDateDisplay';
import { useHabits } from '../context/HabitContext';
import { startOfWeek, endOfWeek, addWeeks, subWeeks, format, isSameYear, isSameMonth, eachDayOfInterval } from 'date-fns';
import navigateLeft from '../assets/navigateLeft.svg';
import navigateRight from '../assets/navigateRight.svg';
import {getHabitWeekDisplay} from '../helpers/getHabitWeekDisplay';
import CircleWeekDisplay from '../utils/circleWeekDisplay';

function ReportWeek() {

  const { habits, setHabits } = useHabits();
  const [displayedWeekStart, setDisplayedWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [displayedWeekEnd, setDisplayedWeekEnd] = useState(endOfWeek(new Date(), { weekStartsOn: 1 }));
 
  function nextWeek() {
  setDisplayedWeekStart(prevDate => addWeeks(prevDate, 1));
  setDisplayedWeekEnd(prevDate => addWeeks(prevDate, 1));
}

  function previousWeek() {
  setDisplayedWeekStart(prevDate => subWeeks(prevDate, 1));
  setDisplayedWeekEnd(prevDate => subWeeks(prevDate, 1));
}

function generateWeekDates(start, end) {
  const dateArray = eachDayOfInterval({ start, end });
  return dateArray.map(date => format(date, 'dd/MM/yyyy'));
}

const weekDates = generateWeekDates(displayedWeekStart, displayedWeekEnd);

function displayHabitWeek(habit, dates) {
  const habitWeekData = getHabitWeekDisplay(habit, dates);

  console.log("habitWeekData", habitWeekData)
  
  return habitWeekData.map(dayData => (
    <CircleWeekDisplay
      key={dayData.date}
      date={dayData.date}
      expected_date={dayData.expected_date}
      completed_date={dayData.completed_date}
      day={dayData.day}
    />
  ));
}

  
  
  return (
      <>
    <div className="px-6">
            <div className= "flex flex-row justify-center items-center">
              <div className= "flex flex-row items-center ">
              <button onClick={previousWeek}><img src= {navigateLeft} alt="navigateLeft" className="-top-16 absolute z-40 transform -translate-x-36 h-44 hover:scale-105"/></button>
              <button onClick={nextWeek}><img src= {navigateRight} alt="navigateRight" className="-top-16 ml-106px absolute z-40 flex h-44 hover:scale-105"/></button>
              </div>
          </div>
      <div className="pt-3 pb-6 flex justify-between items-center">
        
          <button className="flex items-center justify-center text-lg bg-brown-add-button text-FCE3BF font-bold py-2 px-4 border-brown-font border-2 rounded-22px shadow-press-brown-button active:bg-brown-button-press active:translate-y-2px active:shadow-none transition-all duration-100 hover:bg-brown-button-presss">
        <Link to="/reportmonth" className="flex flex-row items-center align-center">    
          <span className="flex">Month</span>
          <img src= {MonthIcon} alt="Back" className="flex ml-2 h-6 w-6 "/>
        </Link>  
          </button>
          <div>
      <div className="font-bold text-right">
    <div className="text-2xl">
    {isSameYear(displayedWeekStart, displayedWeekEnd)
        ? format(displayedWeekStart, 'yyyy') // Same year
        : `${format(displayedWeekStart, 'yyyy')} - ${format(displayedWeekEnd, 'yyyy')}` // Different year
    }
</div>
<div>
    {isSameMonth(displayedWeekStart, displayedWeekEnd)
        ? `${format(displayedWeekStart, 'd')} - ${format(displayedWeekEnd, 'd MMM')}` // Same month
        : `${format(displayedWeekStart, 'd MMM')} - ${format(displayedWeekEnd, 'd MMM')}` // Different month
    }
</div>
</div>
      </div>
        </div> 
      <div className="standard-component px-4 py-6 space-y-4 ">
        {habits.map(habit => (
  <div key={habit.habit_name} className="flex justify-between ">
    <p className="font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">{habit.habit_name}</p>
    <div className="week-display flex flex-row text-center items-center justify-center space-x-1 font-bold">
      {displayHabitWeek(habit, weekDates)}
    </div>
  </div>
))}
      </div>

      
       {}

    </div>
  
  </>
  );
}

export default ReportWeek;