import calculateCompletedDates from '../helpers/calculateCompletedDates';
import calculateConsistency from '../helpers/calculateConsistency';
import calculateStreak from '../helpers/calculateStreak';
import CircleDateDisplay from '../utils/circleDateDisplay';

const ExpandedHabitInfo = ({ habit }) => {

  
  return (
    <div className = "py-3 px-3 w-full">
      <div className="flex flex-wrap">
      <div className="flex flex-col mr-3">
         <div className="flex justify-center">
         <div className = " relative flex flex-col items-center">
          <div className="text-2xl font-bold flex ">
        {calculateConsistency(habit)} <span className="text-base font-normal self-end">% </span>
        </div>
          <div className="flex items-center text-xs font-bold">
         Consistency
          </div>
       </div>
           </div>
        
        
      <div className ="grid grid-cols-2 gap-4 mt-2 justify-center items-center">
        <div className = "flex flex-col items-center justify-center">
          <div className="text-2xl font-bold flex">
        {calculateCompletedDates(habit)}
        </div>
          <div className="flex items-center text-xs font-bold">
         Completed
          </div>
       </div>



          <div className = "flex flex-col items-center justify-center">
          <div className="text-2xl font-bold flex ">
        {calculateStreak(habit)}
        </div>
          <div className="flex items-center text-xs font-bold">
         Streak
          </div>
       </div>
        
        </div>
      </div>

        <div className="w-full md:w-auto">
          {/* Add your Habit Circle Displays component here */}
        </div>
        
      </div>
    </div>
  );
};

export default ExpandedHabitInfo;