import React, { useState, useEffect } from "react";
import './ModalAdjustJournal.css'
import Modal from 'react-modal';
import apiService from "../../apiService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const rootElement = document.getElementById('root');
Modal.setAppElement(rootElement);

const ModalAdjustJournal = ({ isOpen, closeModal, onSave, selectedJournal, setSelectedJournal }) => {
  const [title, setTitle] = useState('');
  const [coverColor, setCoverColor] = useState('');

  useEffect(() => {
    if (selectedJournal) {
      setTitle(selectedJournal.title);
      setCoverColor(selectedJournal.coverColor);
    } 
  }, [selectedJournal]);

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
        setCoverColor('');
        setTitle('');
      }
      closeModal();
      onSave();
      setSelectedJournal('');
    } catch (error) {
      console.error('Error', error);
    }
  };

  const handleModalClose = () => {
    setTitle('');
    setCoverColor('');
    setSelectedJournal('');
    closeModal();
  };

  const handleDeleteClick = async (journalId) => {
    try {
      console.log(journalId);
      await apiService.deleteJournal(journalId);
      onSave();
      handleModalClose();
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
  
  return(
    <Modal
      isOpen={isOpen}
      onRequestClose={handleModalClose}
      className='modal-content'
      contentLabel="adjust journal specifics"
    >
      <form>
        <input
          value={title}  
          type="text"
          placeholder={title ? title : "What's the title?"}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select name="color" value={coverColor || ''} onChange={(e) => setCoverColor(e.target.value)}>
          <option value="" disabled hidden>
            What cover color?
          </option>
          {colorOptions.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
        <button type="button" onClick={handleModalClose}>Cancel</button>
        <button type="button" onClick={handleSaveClick}>Save</button>
      </form>
      {selectedJournal && (
        <div
          className="delete-journal"
          onClick={() => handleDeleteClick(selectedJournal._id)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </div>
      )}
    </Modal>
  )
}

export default ModalAdjustJournal;