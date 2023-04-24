import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../Header';
import { useHabits } from '../context/HabitContext';
import AddHistoricalRecord from '../components/AddHistoricalRecord';
import { useLocation } from 'react-router-dom';
import BackIcon from '../assets/back_icon.svg';
import PageWrapper from '../components/PageWrapper';


const AddHistoricalRecordPage = () => {
  const { habits, handleDelete, handleUpdate } = useHabits();
  const { habitId } = useLocation().state || {};
  const habitIdNumber = Number(habitId);

  return (
    <div>
      <Header text="ADD RECORD" />
            <PageWrapper>
        {
      <div className="px-6">
      <div className="py-4">
        
          <button className="flex items-center justify-center bg-brown-add-button text-FCE3BF font-bold py-2 px-4 rounded-2xl border-brown-font border-2">
        <Link to="/">    
          <img src= {BackIcon} alt="Back" className="h-5 w-5 inline-block"/>
          <span className="ml-2">Back</span>
        </Link>  
          </button>
        
      </div>
      <AddHistoricalRecord habitId={habitIdNumber} className="standard-page" />
    </div>
        }
        </PageWrapper>
    </div>
  );
};

export default AddHistoricalRecordPage;