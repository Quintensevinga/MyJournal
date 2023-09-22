// JournalContext.js
import React, { createContext, useState, useContext } from 'react';

const MyJournalContext = createContext();

export const useJournalContext = () => useContext(MyJournalContext);

export const ContextProvider = ({ children }) => {
  const [journalData, setJournalData] = useState({});

  const updateJournalData = (data) => {
    setJournalData(data);
  }

  const addToEntries = (newEntry) => {
    setJournalData((prevData) => ({
      ...prevData,
      entries: [...prevData.entries, newEntry],
    }));
  };

  return (
    <MyJournalContext.Provider value={{ journalData, updateJournalData, addToEntries }}>
      {children}
    </MyJournalContext.Provider>
  );
};

