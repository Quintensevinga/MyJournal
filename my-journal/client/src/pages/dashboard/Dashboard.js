import React, { useEffect, useState } from 'react';
import './Dashboard.css'
import WriteJournal from '../../components/write-journal/WriteJournal';
import apiService from '../../apiService';
import DashboardJournalGallery from '../../components/dashboard-journal-gallery/dashboardJournalGallery';
import SomeFavorites from '../../components/some-favorites/someFavorites';
import Randomquotes from '../../components/random-quotes/Randomquotes';

const Dashboard = () => {
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const data = await apiService.getAllJournals();
        setJournals(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchJournals();
  }, []);

  return (
    <div>
      <WriteJournal isDashboard={true} journals={journals} />
      <div className='gall-quotes'>
        <DashboardJournalGallery journals={journals} />
        <Randomquotes />
      </div>

      <SomeFavorites />
    </div>
  );
}

export default Dashboard;