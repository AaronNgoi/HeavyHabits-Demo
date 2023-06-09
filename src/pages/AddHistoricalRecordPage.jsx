import React from 'react';
import { Link} from 'react-router-dom';
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
      <div className="pt-3 pb-6">
        
          <button className="flex items-center justify-center text-lg bg-brown-add-button text-FCE3BF py-2 px-4 border-brown-font border-2 rounded-22px shadow-press-brown-button active:bg-brown-button-press active:translate-y-2px active:shadow-none transition-all duration-100 hover:bg-brown-button-presss">
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



