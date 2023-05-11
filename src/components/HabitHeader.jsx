import React from 'react';

const HabitHeader = ({ habitName, habitSubtext }) => (
  <div className="habit-header whitespace-nowrap overflow-hidden overflow-ellipsis">
    <h2 className="text-xl font-bold whitespace-nowrap overflow-hidden overflow-ellipsis">{habitName}</h2>
    {habitSubtext && <p className="-mt-1 whitespace-nowrap overflow-hidden overflow-ellipsis">{habitSubtext}</p>}
  </div>
);

export default HabitHeader;