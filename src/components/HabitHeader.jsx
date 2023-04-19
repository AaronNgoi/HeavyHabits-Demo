import React from 'react';

const HabitHeader = ({ habitName, habitSubtext }) => (
  <div className="habit-header">
    <h2 className="text-xl font-bold">{habitName}</h2>
    {habitSubtext && <p>{habitSubtext}</p>}
  </div>
);

export default HabitHeader;