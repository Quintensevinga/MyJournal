import React, {useEffect, useState} from 'react';
import './ReadJournal.css';
import { useJournalContext } from '../../context';

const ReadJournal = () => {
  const { journalData } = useJournalContext();

  return (
    <div>
      {journalData.entries.map((entry) => (
        <div className='read-journal' key={entry._id}>
          <div className='journal-and-date'>
            <p>{entry.content}</p>
            <p>{entry.date}</p>
          </div>
          <p>{entry.mood}</p>
          <div className='favorite-icon'>
            Heart Icon {/*  TODO: fix icon  */}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReadJournal;
