import React, { useState } from 'react';
import MonthIcon from '../assets/monthIcon.svg';
import { Link } from 'react-router-dom';
import { useHabits } from '../context/HabitContext';
import { startOfWeek, endOfWeek, addWeeks, subWeeks, format, isSameYear, isSameMonth, eachDayOfInterval, parse, compareAsc } from 'date-fns';
import navigateLeft from '../assets/navigateLeft.svg';
import navigateRight from '../assets/navigateRight.svg';
import {getHabitWeekDisplay} from '../helpers/getHabitWeekDisplay';
import CircleWeekDisplay from '../utils/circleWeekDisplay';
import { useSwipeable } from 'react-swipeable';

function ReportWeek() {

  const { habits} = useHabits();
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

const handlers = useSwipeable({
    delta: 50,
    onSwipedLeft: () => previousWeek(),
    onSwipedRight: () => nextWeek(),

   onTap: ({ event }) => {
    // Check if the tap is near the edge of the screen
    const { clientX } = event.touches[0] || event.changedTouches[0];
    const screenWidth = window.innerWidth;
    const edgeThreshold = 50; // Adjust the threshold as needed

    if (clientX <= edgeThreshold) {
      previousWeek();
    } else if (clientX >= screenWidth - edgeThreshold) {
      nextWeek();
    }
  },
  });  

  
function calculateTotalDoneWeekly(habits, weekDates) {
  let count = 0;

  habits.forEach((habit) => {
    weekDates.forEach((date) => {
      if (habit.completed_dates[date] && habit.completed_dates[date] === true) {
        count++;
      }
    });
  });

  return count;
}

function calculateBestStreak(habits, DisplayedWeekEnd) {
  let bestStreak = 0;
  const today = new Date();

  habits.forEach((habit) => {
    const completedDates = habit.completed_dates;
    const expectedDates = habit.expected_dates;
    let currentStreak = 0;

    if (DisplayedWeekEnd > today) {
      DisplayedWeekEnd = today;
    }

    if (DisplayedWeekEnd < parse(habit.habit_created_date, 'dd/MM/yyyy', new Date())) {
      currentStreak = 0;
    } else {
      const sortedDates = Object.keys(completedDates)
        .map((dateString) => parse(dateString, 'dd/MM/yyyy', new Date()))
        .sort(compareAsc);

      for (const date of sortedDates) {
        if (date <= DisplayedWeekEnd) {
          const dateString = format(date, 'dd/MM/yyyy');

          if (completedDates[dateString]) {
            currentStreak++;
          } else if (expectedDates[dateString]) {
            currentStreak = 0;
          }
        }
      }
    }

    bestStreak = Math.max(bestStreak, currentStreak);

  });

  return bestStreak;
}

function calculatePercentageMet(habits, weekDates) {
  let totalExpected = 0;
  let totalDone = 0;

  habits.forEach((habit) => {
    const habitWeekData = getHabitWeekDisplay(habit, weekDates);

    habitWeekData.forEach((dayData) => {
      if (dayData.expected_date) {
        totalExpected++;
      }
      if (dayData.completed_date) {
        totalDone++;
      }
    });
  });

  return totalExpected === 0 ? 0 : Math.round((totalDone / totalExpected) * 100);
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
    </div>

         <div {...handlers} className="px-6">   
      <div className="standard-component px-4 py-6 space-y-4 mb-6">
        {habits.map(habit => (
  <div key={habit.habit_name} className="flex justify-between ">
    <p className="font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">{habit.habit_name}</p>
    <div className="week-display flex flex-row text-center items-center justify-center space-x-1 font-bold">
      {displayHabitWeek(habit, weekDates)}
    </div>
  </div>
))}
      </div>

      
       <div className="standard-component px-4 py-3 space-y-3 flex flex-col">
          <p className="font-bold text-xl text-center">Week in Review</p>
          <div className="flex flex-row">
            <div className="flex flex-col text-center flex-grow-0" style={{ flexBasis: '50%' }}>
               <p className="text-2xl font-bold">{calculateTotalDoneWeekly(habits,weekDates)} </p>
              <p className="text-sm font-bold">Total Done</p>
            </div>
           <div className="flex flex-col items-center justify-start text-center flex-grow" style={{ flexBasis: 'auto'}}>
            <p className="ml-2 text-2xl font-bold"> {calculatePercentageMet(habits, weekDates)} 
              <span className="text-base font-normal self-end">%</span> </p>
            <p className="text-sm font-bold">Met</p>
          </div>  
            <div className="flex flex-col items-center flex-grow-0 text-center justify-start" style={{ flexBasis: '50%' }}>
              <p className="text-2xl font-bold">{calculateBestStreak(habits, displayedWeekEnd)}</p>
              <p className="text-sm font-bold">Best Streak</p>
         </div>  
          </div>
        </div>


</div>


        
  </>
  );
}

export default ReportWeek;