import calculateCompletedDates from '../helpers/calculateCompletedDates';
import calculateConsistency from '../helpers/calculateConsistency';
import calculateStreak from '../helpers/calculateStreak';
import CircleDateDisplay from '../utils/circleDateDisplay';

const ExpandedHabitInfo = ({ habit }) => {

  
  return (
    <div className = "py-3 px-3 w-full">
      <div className="flex flex-col">
         <div className="flex mb-3 ml-8">
         <div className = " relative flex flex-col items-center">
          <div className="text-2xl font-bold flex ">
        {calculateConsistency(habit)} <span className="text-base font-normal self-end">% </span>
        </div>
          <div className="flex items-center text-xs font-bold">
         Consistency
          </div>
       </div>
           </div>
        
        
      <div className ="flex relative items-stretch">
        <div className = " relative flex flex-col items-center mr-4">
          <div className="text-2xl font-bold flex">
        {calculateCompletedDates(habit)}
        </div>
          <div className="flex items-center text-xs font-bold">
         Completed
          </div>
       </div>



          <div className = " relative flex flex-col items-center">
          <div className="text-2xl font-bold flex ">
        {calculateStreak(habit)}
        </div>
          <div className="flex items-center text-xs font-bold">
         Streak
          </div>
       </div>
        
        </div>
      </div>
      
    </div>
  );
};

export default ExpandedHabitInfo;