import React from 'react';

const CircleDateDisplay = ({ date, expected_date, completed_date }) => {
  let bgColor;

  if (completed_date) {
    bgColor = 'bg-green';
  } else if (expected_date && !completed_date) {
    bgColor = 'bg-red';
  } else {
    bgColor = 'bg-biege-display';
  }

  return (
    <div className={`circle-date-display ${bgColor}`}>
      {date}
    </div>
  );
};

export default CircleDateDisplay;
