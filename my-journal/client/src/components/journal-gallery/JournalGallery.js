import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './JournalGallery.css';
import apiService from '../../apiService';
import ModalAdjustJournal from '../modal-adjust-journal/ModalAdjustJournal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { setJournals, setSelectedJournal, toggleModal } from '../../redux/slices/journalGallerySlice';


const JournalGallery = () => {
  const dispatch = useDispatch();
  const { journals, selectedJournal, isModalOpen } = useSelector((state) => state.journalGallery);

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async () => {
    try {
      const data = await apiService.getAllJournals();
      dispatch(setJournals(data));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddJournalClick = () => {
    dispatch(toggleModal());
  }

  const handleAdjustClick = (event, journal) => {
    event.preventDefault();
    const clickedJournal = {
      _id: journal._id,
      title: journal.title,
      coverColor: journal.coverColor,
    };
    dispatch(setSelectedJournal(clickedJournal));
    dispatch(toggleModal());
  }

  return (
    <div className='gallery-box'>
      {journals.map((journal) => (
        <Link  to={`/my-journals/${journal._id}`} key={journal._id} className='menu-link'>
          <div className='journal-box'>
            <div className='journal-cover' style={{ backgroundColor: journal.coverColor || 'black' }}>
              <div className='adjust-icon'>
                <FontAwesomeIcon icon={faEllipsisV} onClick={(event) => handleAdjustClick(event, journal)} />
              </div>
            </div>
            <p className='journal-title-journalpage'>{journal.title}</p>
          </div>
        </Link>
      ))}
      <div className='journal-box' onClick={handleAddJournalClick}>
        <div className='journal-cover' style={{border: '1px solid black'}}>
          <p className='plus-sign'>+</p>
        </div>
        <p className='add-journal-text'>Add journal</p>
      </div>
      <ModalAdjustJournal
        isOpen={isModalOpen}
        closeModal={() => dispatch(toggleModal())}
        onSave={fetchJournals}
        selectedJournal={selectedJournal}
        setSelectedJournal={setSelectedJournal}
        isJournalGallery={true}
        />
    </div>
  );
};

export default JournalGallery;
