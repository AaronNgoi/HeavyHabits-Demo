import React, { useState } from 'react';
import WeekIcon from '../assets/weekIcon.svg';
import { Link } from 'react-router-dom';
import navigateLeft from '../assets/navigateLeft.svg';
import navigateRight from '../assets/navigateRight.svg';
import { startOfMonth, endOfMonth, addMonths, subMonths, format, isSameYear, isSameMonth } from 'date-fns';


function ReportMonth() {
  const [displayedMonthStart, setDisplayedMonthStart] = useState(startOfMonth(new Date()));
const [displayedMonthEnd, setDisplayedMonthEnd] = useState(endOfMonth(new Date()));


  console.log("displayedMonthStart", displayedMonthStart);
  console.log("displayedMonthEnd", displayedMonthEnd);

  function nextMonth() {
  setDisplayedMonthStart(prevDate => addMonths(prevDate, 1));
  setDisplayedMonthEnd(prevDate => addMonths(prevDate, 1));
}

function previousMonth() {
  setDisplayedMonthStart(prevDate => subMonths(prevDate, 1));
  setDisplayedMonthEnd(prevDate => subMonths(prevDate, 1));
}

  
  
  return (
      <>
    <div className="px-6">
                  <div className= "flex flex-row justify-center items-center">
              <div className= "flex flex-row items-center ">
              <button onClick={previousMonth}><img src= {navigateLeft} alt="navigateLeft" className="-top-16 absolute z-40 transform -translate-x-36 h-44 hover:scale-105"/></button>
              <button onClick={nextMonth}><img src= {navigateRight} alt="navigateRight" className="-top-16 ml-106px absolute z-40 flex h-44 hover:scale-105"/></button>
              </div>
          </div>
      <div className="pt-3 pb-6 flex justify-between items-center">
        
          <button className="flex items-center justify-center text-lg bg-brown-add-button text-FCE3BF font-bold py-2 px-4 border-brown-font border-2 rounded-22px shadow-press-brown-button active:bg-brown-button-press active:translate-y-2px active:shadow-none transition-all duration-100 hover:bg-brown-button-presss">
        <Link to="/reportweek" className="flex flex-row items-center align-center">    
          <span className="ml-1 flex">Week</span>
          <img src= {WeekIcon} alt="Back" className="flex ml-3 h-6 w-6 "/>
        </Link>  
          </button>
          
            <div className="font-bold text-right">
    <div className="text-2xl">
      {format(displayedMonthStart, 'yyyy')}
      </div>
              <div>
                {format(displayedMonthStart, 'MMMM')}
              </div>
            </div>
        </div>  
    </div>
  
  </>
  );
}

export default ReportMonth;