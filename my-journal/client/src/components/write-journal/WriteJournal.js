import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../../apiService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './WriteJournal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faPaperPlane, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateSelectedDate,
  updateContent,
  updateMood,
  toggleFavorite,
  resetWriteJournal,
} from '../../redux/slices/writeJournalSlice';

const WriteJournal = ({ isDashboard, journals }) => {
  const dispatch = useDispatch();
  const writeJournalState = useSelector((state) => state.writeJournal);

  const [selectedJournal, setSelectedJournal] = useState('');

  const params = useParams();
  const journalId = params.journalId;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newEntry = {
        created: writeJournalState.selectedDate,
        content: writeJournalState.content,
        mood: writeJournalState.mood,
        favorite: writeJournalState.favorite,
      };
      const response = await apiService.addJournalEntry(selectedJournal || journalId, newEntry);
      console.log(response);
      dispatch(resetWriteJournal());
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite());
  };

  const datePickerRef = useRef(); 

  const openDatePicker = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  return (
    <div className='write-journal'>
      <form className='write-journal-form' onSubmit={handleSubmit}>
        <textarea
          className="journal-text"
          name="journalEntry"
          placeholder="Hey Quinten what's on your mind? Type it here... "
          value={writeJournalState.content}
          onChange={((e) => dispatch(updateContent(e.target.value)))}>  
        </textarea>
        <div className={`favorite-icon ${writeJournalState.favorite ? 'red-heart' : ''}`} onClick={handleFavoriteClick}>
          <FontAwesomeIcon icon={faHeart} />
        </div>
        <div className='bottom-flex-write-journal'>
          <select className="mood-dropdown" name="mood" value={writeJournalState.mood} onChange={(e) => dispatch(updateMood(e.target.value))}>
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
          <div>
            <div className='date-picker-box'>
              <FontAwesomeIcon
                icon={faCalendar}
                className="calendar-icon"
                onClick={openDatePicker}
              />
              <DatePicker
                selected={writeJournalState.selectedDate}
                onChange={(date) => dispatch(updateSelectedDate(date))}
                dateFormat="MMMM d, yyyy"
                className="date-picker"
                ref={datePickerRef}
              />
            </div>
            <div>
              {isDashboard && (
                <select
                  className="journal-dropdown"
                  name="journal"
                  value={selectedJournal}
                  onChange={(e) => setSelectedJournal(e.target.value)}
                >
                  <option value="" disabled hidden>
                    Select a journal
                  </option>
                  {journals?.map((journal) => (
                    <option key={journal._id} value={journal._id}>
                      {journal.title}
                    </option>
                  ))}
                </select>
              )}
              <button className="send-button" type="submit">
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WriteJournal;
