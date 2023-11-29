import React, { useState, useEffect } from "react";
import './ModalAdjustJournal.css'
import Modal from 'react-modal';
import apiService from "../../apiService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const rootElement = document.getElementById('root');
Modal.setAppElement(rootElement);

const ModalAdjustJournal = ({ isOpen, closeModal, onSave, selectedJournal, setSelectedJournal, isJournalPage }) => {
  const [title, setTitle] = useState('');
  const [coverColor, setCoverColor] = useState('');

  useEffect(() => {
    if (selectedJournal) {
      setTitle(selectedJournal.title);
      setCoverColor(selectedJournal.coverColor);
    }
  }, [isOpen]);

  const handleSaveClick = async () => {
    try {
      const newJournal = {
        title,
        coverColor,
      };
      if (selectedJournal) {
        await apiService.updateJournal(selectedJournal._id, newJournal);
      } else {
        await apiService.addJournal(newJournal);
        console.log('heellllo');
        setCoverColor('');
        setTitle('');
      }
      closeModal();
      onSave();
      if (!isJournalPage) setSelectedJournal('');
    } catch (error) {
      console.error('Error', error);
    }
  };

  const handleModalClose = () => {
    setTitle('');
    setCoverColor('');
    if (!isJournalPage) setSelectedJournal('');
    closeModal();
  };

  const handleDeleteClick = async (journalId) => {
    try {
      await apiService.deleteJournal(journalId);
      onSave();
      handleModalClose();
      if (isJournalPage) window.history.back();
    } catch (error) {
      console.error('Error', error);
    }
  }

  const colorOptions = [
    'Red',
    'Blue',
    'Green',
    'Yellow',
    'Purple',
    'Orange',
    'Pink',
  ];

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleModalClose}
      className='modal-content'
      contentLabel="adjust journal specifics"
    >
      <div className="modal-box">
        <div className="form-container">
          <form>
            <input
              className="input-journal-title"
              value={title}
              type="text"
              placeholder={title ? title : "What's the title?"}
              onChange={(e) => setTitle(e.target.value)}
            />
            <select className="input-covercolor" name="color" value={coverColor || ''} onChange={(e) => setCoverColor(e.target.value)}>
              <option value="" disabled hidden>
                What cover color?
              </option>
              {colorOptions.map((color) => (
                <option key={color} value={color}>
                  {color}
                </option>
              ))}
            </select>
            <div className="button-container">
              <button type="button" onClick={handleModalClose}>Cancel</button>
              <button type="button" onClick={handleSaveClick}>Save</button>
            </div>
          </form>
          {selectedJournal && (
            <div
              className="delete-journal"
              onClick={() => handleDeleteClick(selectedJournal._id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </div>
          )}
        </div>

      </div>

    </Modal>
  )
}

export default ModalAdjustJournal;