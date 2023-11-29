import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './ReadJournal.css';
import apiService from '../../apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTrash } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import { setEntries, addEntry, updateEntry, deleteEntry } from '../../redux/slices/readJournalSlice'

const ReadJournal = ({ isFavoritesPage, favoriteEntries, handleFavoriteToggle, isJournalPage, someFavEntry }) => {
  const dispatch = useDispatch();
  const { entries } = useSelector((state) => state.journal);

  const params = useParams();
  const journalId = params.journalId;

  const sortEntriesByDate = (entries) => {
    return entries.slice().sort((a, b) => {
      const dateA = new Date(a.created);
      const dateB = new Date(b.created);
      return dateB - dateA;
    });
  };

  useEffect(() => {
    const fetchJournalData = async () => {
      try {
        if (isJournalPage) {
          const data = await apiService.getJournalData(journalId);
          dispatchEvent(setEntries(sortEntriesByDate(data.entries)));
        } else {
          return;
        }
      } catch (error) {
        console.error('Error fetching journal entries:', error);
      }
    };
    fetchJournalData();
  });



  const handleFavoriteClick = async (entryId) => {
    if (isJournalPage) {
      const entryToUpdate = entries.find((entry) => entry._id === entryId);
      const newFavoriteState = !entryToUpdate.favorite;
      const response = await apiService.updateJournalEntry(journalId, entryId, {
        favorite: newFavoriteState,
      });
      dispatch(setEntries(response));    }
    if (isFavoritesPage) {
      handleFavoriteToggle(entryId);
    } 
  };

  const handleDeleteClick = async (entryId) => {
    try {
      await apiService.deleteJournalEntry(journalId, entryId);
      dispatch(deleteEntry(entryId));
    } catch (error) {
      console.error('Error deleting journal entry:', error);
    }
  };


  return (
    <div>
      <div className='journals-container'>
        {someFavEntry ? (
          <div className='read-journal' key={someFavEntry._id}>
            {/* <p className='static-journal-title'> One of your favorites...</p> */}
            <div className='journal-and-date'>
              <p className='entry-content'>{someFavEntry.content}</p>
              <p className='entry-date'>~{moment(someFavEntry.created).format('DD MMM YYYY')}</p>
            </div>
            <div className='mood-box'>
              <p className='mood'>{someFavEntry.mood}</p>
            </div>
            <div
              className={`favorite-icon-entry ${someFavEntry.favorite ? 'red-heart' : ''}`}
            >
              <FontAwesomeIcon icon={faHeart} />
            </div>
          </div>
        ) : isFavoritesPage ? (
          favoriteEntries?.length > 0 ? (
            sortEntriesByDate(favoriteEntries).map((entry) => (
              <div className='read-journal' key={entry._id}>
                <div className='journal-and-date'>
                  <p className='entry-content'>{entry.content}</p>
                  <p className='entry-date'>~{moment(entry.created).format('DD MMM YYYY')}</p>
                </div>
                <div className='mood-box'>
                  <p className='mood'>{entry.mood}</p>
                </div>
                <div
                  className={`favorite-icon-entry ${entry.favorite ? 'red-heart' : ''}`}
                  onClick={() => {
                    handleFavoriteClick(entry._id);
                  }}
                >
                  <FontAwesomeIcon icon={faHeart} />
                </div>
              </div>
            ))
          ) : (
            <p></p>
          )
        ) : entries?.length > 0 ? (
          entries.map((entry) => (
            <div className='read-journal' key={entry._id} style={{ width: '80%' }}>
              <div className='journal-and-date'>
                <p className='entry-content'>{entry.content}</p>
                <p className='entry-date'>~{moment(entry.created).format('DD MMM YYYY')}</p>
              </div>
              <div className='mood-box'>
                <p className='mood'>{entry.mood}</p>
              </div>
              <div
                className={`favorite-icon-entry ${entry.favorite ? 'red-heart' : ''}`}
                onClick={() => {
                  handleFavoriteClick(entry._id);
                }}
              >
                <FontAwesomeIcon icon={faHeart} />
              </div>
              {isJournalPage ? (
                <div
                  className='trash-icon'
                  onClick={() => {
                    handleDeleteClick(entry._id);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </div>
              ) : null}
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default ReadJournal;
