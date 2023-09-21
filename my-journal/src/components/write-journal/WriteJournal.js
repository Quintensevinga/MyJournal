import React from 'react';
import './WriteJournal.css'

const WriteJournal = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='write-journal'>
      <form onSubmit={handleSubmit}>
        <textarea
          className="journal-text"
          name="journalEntry" 
          placeholder="Hey Quinten what's on your mind? Type it here... "
        ></textarea>
        
        <div className='favorite-icon'>
          Heart Icon {/*  TODO: fix icon  */}
        </div>

        <div className='bottom-flex-write-journal'>
          <select className="mood-dropdown" name="mood">
            <option value="" disabled selected hidden>
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