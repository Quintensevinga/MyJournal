import React, { useEffect, useState } from 'react';
import WriteJournal from '../../components/write-journal/WriteJournal';
import apiService from '../../apiService';

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
      <WriteJournal isDashboard={true} journals={ journals } />
      {/* Add additional features later */}
    </div>
  );
}

export default Dashboard;
