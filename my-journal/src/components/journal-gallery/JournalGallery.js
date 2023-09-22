// JournalGallery.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './JournalGallery.css';
import apiService from '../../apiService';

const JournalGallery = () => {
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

  const handleAddJournalClick = () => {
    console.log('add journal clicked')
    // TODO add logic opening journal page.
  }

  return (
    <div className='gallery-box'>
      {journals.map((journal) => (
        <Link  to={`/my-journals/${journal._id}`} key={journal._id}>
          <div className='journal-box'>
            <div className='journal-cover' style={{ backgroundColor: journal.coverColor || 'black' }}></div>
            <p>{journal.title}</p>
          </div>
        </Link>
      ))}
      <div className='journal-box' onClick={handleAddJournalClick}>
        <div className='journal-cover' style={{border: '1px solid black'}}>
          <p className='plus-sign'>+</p>
        </div>
        <p>Add journal</p>
      </div>
    </div>
  );
};

export default JournalGallery;
