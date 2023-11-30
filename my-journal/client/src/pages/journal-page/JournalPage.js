import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import apiService from '../../apiService';
import './JournalPage.css'
import WriteJournal from '../../components/write-journal/WriteJournal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import ModalAdjustJournal from '../../components/modal-adjust-journal/ModalAdjustJournal'
import ReadJournal from '../../components/read-journal/ReadJournal';
import { setJournalData, toggleModal } from '../../redux/slices/journalPageSlice'; 


const JournalPage = () => {
  const dispatch = useDispatch();
  const { journalData, isModalOpen } = useSelector((state) => state.journalPage);

  const params = useParams();
  const journalId = params.journalId;

  useEffect(() => {
    fetchJournalData();
  });

  const fetchJournalData = async () => {
    try {
      const data = await apiService.getJournalData(journalId);
      dispatch(setJournalData(data));
    } catch (error) {
      console.error('Error fetching journal entries:', error);
    }
  };

  const handleAdjustClick = () => {
    dispatch(toggleModal());
  }

  return (
    <div>
      <div className='journal-page-header'>
        <div className='cover' style={{ backgroundColor: journalData.coverColor }}>
          <div className='adjust-icon'>
            <FontAwesomeIcon icon={faEllipsisV} onClick={handleAdjustClick} />
          </div>
          <p className='book-title'>{journalData.title}</p>
        </div>
        <WriteJournal journalEntries={journalData.entries} />
      </div>
      <ReadJournal isJournalPage={true} journalData={ journalData} />
      <ModalAdjustJournal 
        isOpen={isModalOpen}
        closeModal={() => handleAdjustClick()}
        onSave={fetchJournalData}
        selectedJournal={journalData}
        isJournalPage={true}
      />
    </div>
  )
}

export default JournalPage;