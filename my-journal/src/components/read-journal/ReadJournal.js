import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './ReadJournal.css';
import apiService from '../../apiService';
import { useJournalContext } from '../../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';

const ReadJournal = ({ isFavorites, favoriteEntries, setFavoriteEntries }) => {
  const { updateJournalData } = useJournalContext();
  const [entries, setEntries] = useState([]);
  const params = useParams();
  const journalId = params.journalId;

  useEffect(() => {
    const fetchJournalData = async () => {
      try {
        if (journalId) {
          const data = await apiService.getJournalData(journalId);
          updateJournalData(data);
          setEntries(data.entries);
        } else {
          return;
        }
      } catch (error) {
        console.error('Error fetching journal entries:', error);
      }
    };
    fetchJournalData();
  }, []); 

  const handleFavoriteClick = async (entryId) => {
    const entryToUpdate = entries.find((entry) => entry._id === entryId);
    const newFavoriteState = !entryToUpdate.favorite;
    const response = await apiService.updateJournalEntry(journalId, entryId, {
      favorite: newFavoriteState,
    });
    if (isFavorites) {
      setFavoriteEntries(response);
    } else {
      setEntries(response);
    }
  };

  return (
    <div>
      {isFavorites? favoriteEntries?.length > 0? favoriteEntries.map((entry) => (
            <div className='read-journal' key={entry._id}>
              <div className='journal-and-date'>
                <p>{entry.content}</p>
                <p>{entry.date}</p>
              </div>
              <p>{entry.mood}</p>
              <div
                className='trash-icon'
                // onClick={() => {
                //   handleDeleteClick(entry._id);
                // }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </div>
              <div
                className={`favorite-icon ${entry.favorite ? 'red-heart' : ''}`}
                onClick={() => {
                  handleFavoriteClick(entry._id);
                }}
              >
                <FontAwesomeIcon icon={faHeart} />
              </div>
            </div>
          ))
          : <p>No favorite entries.</p>
        : entries?.length > 0? entries.map((entry) => (
            <div className='read-journal' key={entry._id}>
              <div className='journal-and-date'>
                <p>{entry.content}</p>
                <p>{entry.date}</p>
              </div>
              <p>{entry.mood}</p>
              <div
                className={`favorite-icon ${entry.favorite ? 'red-heart' : ''}`}
                onClick={() => {
                  handleFavoriteClick(entry._id);
                }}
              >
                <FontAwesomeIcon icon={faHeart} />
              </div>
            </div>
          ))
          : <p>No journal entries.</p>}
    </div>
  );
};

export default ReadJournal;
