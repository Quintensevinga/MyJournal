import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  journalData: {
    title: '',
    coverColor: '',
    entries: [],
  },
  isModalOpen: false,
};

const journalPageSlice = createSlice({
  name: 'journalPage',
  initialState,
  reducers: {
    setJournalData: (state, action) => {
      state.journalData = action.payload;
    },
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
  },
});

export const { setJournalData, toggleModal } = journalPageSlice.actions;

export default journalPageSlice.reducer;
