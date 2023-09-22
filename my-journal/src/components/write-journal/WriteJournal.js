import React, {useState} from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../../apiService';
import './WriteJournal.css'
import { useJournalContext } from '../../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


const WriteJournal = () => {
  const { updateJournalData } = useJournalContext();

  const [journalEntry, setJournalEntry] = useState('');
  const [mood, setMood] = useState('');
  const [favorite, setFavorite] = useState(false);
  const params = useParams();
  const journalId = params.journalId;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEntry = {
        created: Date.now(),
        content: journalEntry,
        mood,
        favorite,
      };

      const response = await apiService.addJournalEntry(journalId, newEntry);
      console.log(response)
      updateJournalData(response);
      setJournalEntry('');
      setMood('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFavoriteClick = () => {
    setFavorite(!favorite);
  }

  return (
    <div className='write-journal'>
      <form onSubmit={handleSubmit}>
        <textarea
          className="journal-text"
          name="journalEntry" 
          placeholder="Hey Quinten what's on your mind? Type it here... "
          value={journalEntry}
          onChange={((e) => setJournalEntry(e.target.value))}
        ></textarea>
        
        <div className={`favorite-icon ${favorite ? 'red-heart' : ''}`} onClick={handleFavoriteClick}>
          <FontAwesomeIcon icon={faHeart} />
        </div>

        <div className='bottom-flex-write-journal'>
          <select className="mood-dropdown" name="mood" value={mood} onChange={(e) => setMood(e.target.value)}>
            <option value="" disabled hidden>
              What's your mood?
            </option>
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="excited">Excited</option>
            <option value="grateful">Grateful</option>
            <option value="motivated">Motivated</option>
            <option value="angry">Angry</option>
          </select>

          <button className="send-button" type="submit">
            Send
          </button>
        </div>
      </form>
    </div>
  )
}

export default WriteJournal;