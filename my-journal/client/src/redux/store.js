import { configureStore } from '@reduxjs/toolkit';
import writeJournalSlice from './slices/writeJournalSlice';
import journalGallerySlice from './slices/journalGallerySlice';
import readJournalSlice from './slices/readJournalSlice';

const store = configureStore({
  reducer: {
    writeJournal: writeJournalSlice,
    journalGallery: journalGallerySlice,
    readJournal: readJournalSlice,
  },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;

export default store;
