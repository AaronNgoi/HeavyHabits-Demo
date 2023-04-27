import React, { useState, useEffect } from 'react';

function HabitForm({ initialValues, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    habitName: initialValues?.habit_name || '',
    repeat_option: initialValues?.repeat_option || 'Weekly',
    timesPerWeek: initialValues?.repeat_times || 1,
    tickedDays: initialValues?.repeat_days || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    habitImportance: initialValues?.habit_subtext || '',
  });
  

  // Form UI - Defines days of week and their labels for display.
  const daysOfWeek = [
    { label: 'M', value: 'Monday' },
    { label: 'T', value: 'Tuesday' },
    { label: 'W', value: 'Wednesday' },
    { label: 'T', value: 'Thursday' },
    { label: 'F', value: 'Friday' },
    { label: 'S', value: 'Saturday' },
    { label: 'S', value: 'Sunday' },
  ];

  // Form UI - Toggle selection of days in form.
const toggleDaySelection = (day) => {
  if (!formData.tickedDays.length) {
    setFormData({ ...formData, tickedDays: [day] });
  } else if (formData.tickedDays.includes(day)) {
    setFormData({ ...formData, tickedDays: formData.tickedDays.filter((d) => d !== day) });
  } else {
    setFormData({ ...formData, tickedDays: [...formData.tickedDays, day] });
  }
};

  // Form UI - Used to clear tickedDays State when repeat_option changes to Weekly.
// useEffect(() => {
//   if (initialValues.repeat_option === 'Weekly') {
//     setFormData((prevFormData) => ({ ...prevFormData, tickedDays: [] }));
//   } else if (initialValues.repeat_option === 'Ticked Days') {
//     setFormData((prevFormData) => ({ ...prevFormData, tickedDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] }));
//   }
// }, [initialValues]);

  // 
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
 
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

const { habitName, repeat_option, timesPerWeek, tickedDays, habitImportance } = formData;

  
  return (
    <form onSubmit={handleSubmit} className="p-8 text-lg font-bold flex flex-col gap-4 shadow-md drop-shadow-md pb-8">
      <div  className="flex items-center justify-between">
        <label className="w-full">
        Habit Name:
          <div className="input-wrapper flex-1 w-full"> 
            <input type="text" name="habitName" value={habitName} onChange={handleChange} className="w-full text-base font-normal pl-4" required/>
          </div>
      </label>
        </div>
    <div  className="flex items-center">
      <label className="mr-4">
        Repeat:
      </label>
            <select name="repeat_option" value={repeat_option} onChange={handleChange} className="text-base font-normal">
              <option value="Weekly">Weekly</option>
              <option value="Ticked Days">Ticked Days</option>
              </select>
    </div>
      {repeat_option === 'Weekly' ? (
      <div className="flex items-center">
        <label className="flex items-center">
          Times a week:
            <select name ="timesPerWeek" value={timesPerWeek} onChange={handleChange} className="text-base font-normal ml-4">
            {[1, 2, 3, 4, 5, 6].map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>
        </label>
        </div>
      ) : (
          <div className="grid grid-cols-7 gap-2">
            {daysOfWeek.map((day) => (
              <label key={day.value} className="flex flex-col items-center">                  <button
                   type="button"
                  aria-label="Tick button"
                  className={`form-day-btn ${tickedDays.includes(day.value) ? 'selected' : ''}`}
                   onClick={() => toggleDaySelection(day.value)}
                 >
                   {tickedDays.includes(day.value) ? '✓' : ''}
                 </button>
                 <span className="-mt-1">{day.label}</span>
               </label>
             ))}
            </div>
      )}
  <div className="flex flex-col">
      <label>
        Why is this important?
        <textarea name="habitImportance" value={habitImportance} onChange={handleChange} className="w-full text-base font-normal" />
      </label>
    </div>
      {onCancel ? (
  <div className="flex justify-between">
    <button
      className="flex items-center justify-center bg-green text-FCE3BF font-bold text-biege-form-colour py-2 px-4 rounded-3xl w-full"
    >
      SAVE
    </button>
    <button
      className="flex items-center justify-center bg-red text-FCE3BF font-bold text-biege-form-colour py-2 px-4 rounded-3xl w-full ml-4"
      type="button"
      onClick={onCancel}
    >
      CANCEL
    </button>
  </div>
) : (
  <button
    className="flex items-center justify-center bg-green text-FCE3BF font-bold text-biege-form-colour py-2 px-4 rounded-3xl w-full"
  >
    SAVE
  </button>
)}
  </form>
  );
};

export default HabitForm