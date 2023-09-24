import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './JournalGallery.css';
import apiService from '../../apiService';
import ModalAdjustJournal from '../modal-adjust-journal/ModalAdjustJournal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const JournalGallery = () => {
  const [journals, setJournals] = useState([]);
  const [selectedJournal, setSelectedJournal] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false); 

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      const data = await apiService.getAllJournals();
      setJournals(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddJournalClick = () => {
    setIsModalOpen(true);
  }

  const handleAdjustClick = (event, journal) => {
    event.preventDefault();
    const clickedJournal = {
      _id: journal._id,
      title: journal.title,
      coverColor: journal.coverColor,
    };
    setSelectedJournal(clickedJournal)
    setIsModalOpen(true);
  }

  return (
    <div className='gallery-box'>
      {journals.map((journal) => (
        <Link  to={`/my-journals/${journal._id}`} key={journal._id}>
          <div className='journal-box'>
            <div className='journal-cover' style={{ backgroundColor: journal.coverColor || 'black' }}>
              <div className='adjust-icon'>
                <FontAwesomeIcon icon={faEllipsisV} onClick={(event) => handleAdjustClick(event, journal)} />
              </div>
            </div>
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
      <ModalAdjustJournal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        onSave={fetchJournals}
        selectedJournal={selectedJournal}
        setSelectedJournal={setSelectedJournal}
        />
    </div>
  );
};

export default JournalGallery;
