import { createSlice } from '@reduxjs/toolkit';

const writeJournalSlice = createSlice({
  name: 'writeJournal',
  initialState: {
    selectedDate: Date.now(),
    content: '',
    mood: '',
    favorite: false,
    selectedJournal: '',
  },
  reducers: {
    updateSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    updateContent: (state, action) => {
      state.content = action.payload;
    },
    updateMood: (state, action) => {
      state.mood = action.payload;
    },
    toggleFavorite: (state) => {
      state.favorite = !state.favorite;
    },
    updateSelectedJournal: (state, action) => {
      state.selectedJournal = action.payload;
    },
    resetWriteJournal: (state) => {
      state.selectedDate = Date.now();
      state.content = '';
      state.mood = '';
      state.favorite = false;
      state.selectedJournal = '';
    },
  },
});

export const {
  updateSelectedDate,
  updateContent,
  updateMood,
  toggleFavorite,
  updateSelectedJournal,
  resetWriteJournal,
} = writeJournalSlice.actions;

export default writeJournalSlice.reducer;
