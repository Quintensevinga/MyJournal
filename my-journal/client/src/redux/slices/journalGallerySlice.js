import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  journals: [],
  selectedJournal: null,
  isModalOpen: false,
};

const journalGallerySlice = createSlice({
  name: 'journalGallery',
  initialState,
  reducers: {
    setJournals: (state, action) => {
      state.journals = action.payload;
    },
    setSelectedJournal: (state, action) => {
      state.selectedJournal = action.payload;
    },
    toggleModal: (state) => {
      state.isModalOpen = !state.isModalOpen;
    },
  },
});

export const { setJournals, setSelectedJournal, toggleModal } = journalGallerySlice.actions;

export default journalGallerySlice.reducer;
