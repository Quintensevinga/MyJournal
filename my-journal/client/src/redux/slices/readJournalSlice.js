import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entries: [],
};

const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    setEntries: (state, action) => {
      state.entries = action.payload;
    },
    addEntry: (state, action) => {
      state.entries.push(action.payload);
    },
    updateEntry: (state, action) => {
      const { entryId, updatedEntry } = action.payload;
      const index = state.entries.findIndex(entry => entry._id === entryId);
      if (index !== -1) {
        state.entries[index] = { ...state.entries[index], ...updatedEntry };
      }
    },
    deleteEntry: (state, action) => {
      const entryId = action.payload;
      state.entries = state.entries.filter(entry => entry._id !== entryId);
    },
  },
});

export const { setEntries, addEntry, updateEntry, deleteEntry } = journalSlice.actions;

export default journalSlice.reducer;
