import React, { useEffect, useState } from "react";
import apiService from "../../apiService";
import './someFavorites.css'
import ReadJournal from "../read-journal/ReadJournal";

const SomeFavorites = () => {
  const [favoriteEntry, setFavoriteEntry] = useState([]);

  useEffect(() => {
    const fetchFavoriteEntry = async () => {
      try {
        const data = await apiService.getAllFavoriteEntries();
        if (data.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.length);
          const randomFavoriteEntry = data[randomIndex];
          setFavoriteEntry(randomFavoriteEntry);
        }
      } catch (error) {
        console.error('Error fetching favorite entries:', error);
      }
    };
    fetchFavoriteEntry();
  }, []);

  return (
    <div>
      {favoriteEntry && <ReadJournal isJournalPage={false} someFavEntry={favoriteEntry} />}
    </div>
  )
}

export default SomeFavorites;
