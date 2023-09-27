import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiService from '../../apiService';
import './JournalPage.css'
import WriteJournal from '../../components/write-journal/WriteJournal';
import { useJournalContext } from '../../context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import ModalAdjustJournal from '../../components/modal-adjust-journal/ModalAdjustJournal'
import ReadJournal from '../../components/read-journal/ReadJournal';

const JournalPage = () => {
  const { journalData, updateJournalData } = useJournalContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const params = useParams();
  const journalId = params.journalId;

  useEffect(() => {
    fetchJournalData();
  }, []);

  const fetchJournalData = async () => {
    try {
      const data = await apiService.getJournalData(journalId);
      updateJournalData(data);
    } catch (error) {
      console.error('Error fetching journal entries:', error);
    }
  };

  const handleAdjustClick = () => {
    setIsModalOpen(true);
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
        closeModal={() => setIsModalOpen(false)}
        onSave={fetchJournalData}
        selectedJournal={journalData}
        isJournalPage={true}
      />
    </div>
  )
}

export default JournalPage;