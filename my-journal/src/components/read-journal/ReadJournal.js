import React from 'react';
import './ReadJournal.css'

const ReadJournal = () => {
  return (
    <div className='read-journal'>
      <div className='journal-and-date'>
        <p>Some Journal...................</p>
        <p>21 Sept. 2023</p>
      </div>
      <p>MOOD</p>
      <div className='favorite-icon'>
        Heart Icon {/*  TODO: fix icon  */}
      </div>
    </div>
  )
}

export default ReadJournal;