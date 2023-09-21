// JournalGallery.js
import React, { useEffect, useState } from 'react';
import './JournalGallery.css';
import apiService from '../../apiService';

const JournalGallery = () => {
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiService.getAllJournals();
        setJournals(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className='gallery-box'>
      {journals.map((journal) => (
        <div className='journal-box' key={journal._id}>
          <div className='journal-cover' style={{ backgroundColor: journal.coverColor || 'black' }}></div>
          <p>{journal.title}</p>
        </div>
      ))}
      <div className='journal-box'>
        <div className='journal-cover'></div>
        <p>Add journal</p>
      </div>
    </div>
  );
};

export default JournalGallery;
