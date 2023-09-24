import React, { useEffect, useState } from 'react';
import apiService from '../../apiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Favorites = () => {
  const [favoriteEntries, setFavoriteEntries] = useState([]);

  useEffect(() => {
    const fetchFavoriteEntries = async () => {
      try {
        const data = await apiService.getAllFavoriteEntries();
        setFavoriteEntries(data);
      } catch (error) {
        console.error('Error fetching favorite entries:', error);
      }
    };
    fetchFavoriteEntries();
  }, []);

  const handleFavoriteClick = async (entryId) => {
    const entryToUpdate = favoriteEntries.find(entry => entry._id === entryId);
    const newFavoriteState = !entryToUpdate.favorite;
    await apiService.updateSingleJournalEntry(entryId, { favorite: newFavoriteState });

    const updatedFavoriteEntries = favoriteEntries.map(entry => {
      if (entry._id === entryId) {
        return { ...entry, favorite: newFavoriteState };
      }
      return entry;
    });
    setFavoriteEntries(updatedFavoriteEntries);
  };

  return (
    <div>
      <p>All your favorite journal entries</p>
      {favoriteEntries?.length > 0 ? (
        <div>
          {favoriteEntries.map((entry) => (
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
            </div>
          ))}
        </div>
      ) : (
        <p>No favorite entries to display.</p>
      )}
    </div>
  );
};

export default Favorites;
