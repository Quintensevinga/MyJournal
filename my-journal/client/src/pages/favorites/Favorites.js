import React, { useEffect, useState } from 'react';
import apiService from '../../apiService';
import ReadJournal from '../../components/read-journal/ReadJournal';
import './favorites.css'

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
    <div className='favorites-content'>
      <p className='favorites-header'>All your favorite journal entries...</p>
      <ReadJournal isFavoritesPage={true} favoriteEntries={favoriteEntries} handleFavoriteToggle={ handleFavoriteClick } />
    </div>
  );
};

export default Favorites;
