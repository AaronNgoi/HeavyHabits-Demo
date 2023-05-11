import React, {useState} from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../Header';
import { useHabits } from '../context/HabitContext';
import { useLocation } from 'react-router-dom';
import BackIcon from '../assets/back_icon.svg';
import SaveIcon from '../assets/save.svg';
import PageWrapper from '../components/PageWrapper';
import ReorderHabits from '../components/ReorderHabits';


function ReorderHabitsPage () {
  
  const { habitId } = useLocation().state || {};
  const habitIdNumber = Number(habitId);

  //   function handleSave() {
  //   setHabits(tempHabits);
  // }
  
  return (
    <div>
      <Header text="REORDER HABITS" />
            <PageWrapper>
      <ReorderHabits/>
        </PageWrapper>
    </div>
  );
};

export default ReorderHabitsPage;