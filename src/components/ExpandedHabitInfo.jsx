import calculateCompletedDates from '../helpers/calculateCompletedDates';
import calculateConsistency from '../helpers/calculateConsistency';
import calculateStreak from '../helpers/calculateStreak';
import CircleDateDisplay from '../utils/circleDateDisplay';
import {getHabitDisplayData} from '../helpers/getHabitDisplayData';

import { format, isSameMonth, isSameWeek, subWeeks, startOfWeek } from 'date-fns';

const ExpandedHabitInfo = ({ habit }) => {

const startDate = subWeeks(startOfWeek(new Date()), 12);
const habitDisplayData = getHabitDisplayData(habit, startDate);

  const renderWeeks = (habitDisplayData) => {
  const weeks = [];
  let week = [];
  const weekLabels = ['&nbsp;', 'M', '', 'W', '', 'F', '', 'S'];
      // add day labels to first column
  weeks.push(
<div key="day-labels" className="week-column flex flex-col">
  <div className="week-label flex justify-center items-center font-bold text-9">
    <span className="inline-flex justify-center items-center w-13 h-13">M</span>
  </div>
  <div className="week-label flex justify-center items-center font-bold text-9">
    <span className="inline-flex justify-center items-center w-13 h-13">&nbsp;</span>
  </div>
  <div className="week-label flex justify-center items-center font-bold text-9">
    <span className="inline-flex justify-center items-center w-13 h-13">W</span>
  </div>
  <div className="week-label flex justify-center items-center font-bold text-9">
    <span className="inline-flex justify-center items-center w-13 h-13">&nbsp;</span>
  </div>
  <div className="week-label flex justify-center items-center font-bold text-9">
    <span className="inline-flex justify-center items-center w-13 h-13">F</span>
  </div>
  <div className="week-label flex justify-center items-center font-bold text-9">
    <span className="inline-flex justify-center items-center w-13 h-13">&nbsp;</span>
  </div>
  <div className="week-label flex justify-center items-center font-bold text-9">
    <span className="inline-flex justify-center items-center w-13 h-13 leading-4">S</span>
  </div>
</div>
  );

  for (let i = 0; i < habitDisplayData.length; i++) {
    week.push(
      <CircleDateDisplay
        key={habitDisplayData[i].date}
        date={habitDisplayData[i].date.toString()}
        completed_date={habitDisplayData[i].completed_date}
        expected_date={habitDisplayData[i].expected_date}
      />
    );

    if (week.length === 7 || i === habitDisplayData.length - 1) {
      weeks.push(<div key={`week-${i}`} className="week-column flex flex-col">{week}</div>);
      week = [];
    }
  }

  return weeks;
};

  const weeks = renderWeeks(habitDisplayData);
  
  return (
    <div className = "py-3 px-4 w-full">
      <div className="flex flex-wrap">
      <div className="flex flex-col mr-4">
         <div className="flex justify-center">
         <div className = " relative flex flex-col items-center">
          <div className="text-2xl font-bold flex ">
        {calculateConsistency(habit)} <span className="text-base font-normal self-end">% </span>
        </div>
          <div className="flex items-center text-xs font-bold -mt-1">
         Consistency
          </div>
       </div>
           </div>
        
        
      <div className ="grid grid-cols-2 gap-4 mt-2 justify-center items-center">
        <div className = "flex flex-col items-center justify-center">
          <div className="text-2xl font-bold flex">
        {calculateCompletedDates(habit)}
        </div>
          <div className="flex items-center text-xs font-bold -mt-1">
         Done
          </div>
       </div>



          <div className = "flex flex-col items-center justify-center">
          <div className="text-2xl font-bold flex ">
        {calculateStreak(habit)}
        </div>
          <div className="flex items-center text-xs font-bold -mt-1">
         Streak
          </div>
       </div>
        
        </div>
      </div>
        <div className="flex flex-col justify-center flex-grow">
        <div className="w-full justify-center flex">
          {weeks}
        </div>
            <div className="flex justify-center mt-1">
        <div className="flex items-center mr-2">
          <div className="w-3 h-3 bg-green rounded-full mr-1" />
          <span className= " font-bold text-11"> Done </span>
        </div>
        <div className="flex items-center mr-2">
          <div className="w-3 h-3 bg-biege-display rounded-full mr-1 border border-brown-border " />
          <span className= " font-bold text-11"> Day Off </span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red rounded-full mr-1 " />
          <span className= " font-bold text-11"> Miss </span>
        </div>
      </div>
      </div>
    </div>
  </div>
  );
};

export default ExpandedHabitInfo;