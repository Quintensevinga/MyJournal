import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../../apiService';
import './JournalPage.css'
import WriteJournal from '../../components/write-journal/WriteJournal';
import { useJournalContext } from '../../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';

const JournalPage = () => {
  const { journalData, updateJournalData } = useJournalContext();
  const [entries, setEntries] = useState([]);
  const params = useParams();
  const journalId = params.journalId;

  useEffect(() => {
    const fetchJournalData = async () => {
      try {
        const data = await apiService.getJournalData(journalId);
        updateJournalData(data);
        setEntries(data.entries);
        console.log(data);
      } catch (error) {
        console.error('Error fetching journal entries:', error);
      }
    };
    fetchJournalData();
  }, []);

  const handleFavoriteClick = async (entryId) => {
    const entryToUpdate = entries.find(entry => entry._id === entryId);
    const newFavoriteState = !entryToUpdate.favorite;
    const response = await apiService.updateJournalEntry(journalId, entryId, { favorite: newFavoriteState });
    setEntries(response);
  };

  const handleDeleteClick = async (entryId) => {
    try {
      await apiService.deleteJournalEntry(journalId, entryId);
      setEntries((prevEntries) => prevEntries.filter((entry) => entry._id !== entryId));
    } catch (error) {
      console.error('Error deleting journal entry:', error);
    }
  };

  return (
    <div>
      <div className='journal-page-header'>
        <div className='cover' style={{ backgroundColor: journalData.coverColor }}>
          <p className='book-title'>{journalData.title}</p>
        </div>
        <WriteJournal setEntries={ setEntries } />
      </div>
      {entries?.length > 0 ? (
        <div>
          {entries.map((entry) => (
            <div className='read-journal' key={entry._id}>
              <div className='journal-and-date'>
                <p>{entry.content}</p>
                <p>{entry.created}</p>
              </div>
              <p>{entry.mood}</p>
              <div
                className={`favorite-icon ${entry.favorite ? 'red-heart' : ''}`}
                onClick={() => {
                  handleFavoriteClick(entry._id);
                }}>
                <FontAwesomeIcon icon={faHeart} />
              </div>
              <div
                className='trash-icon'
                onClick={() => {
                  handleDeleteClick(entry._id);
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p></p>
      )}
    </div>
  )
}

export default JournalPage;