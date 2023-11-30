import { configureStore } from '@reduxjs/toolkit';
import writeJournalSlice from './slices/writeJournalSlice';
import journalGallerySlice from './slices/journalGallerySlice';
import readJournalSlice from './slices/readJournalSlice';
import journalPageSlice from './slices/journalPageSlice';

const store = configureStore({
  reducer: {
    writeJournal: writeJournalSlice,
    journalGallery: journalGallerySlice,
    journal: readJournalSlice,
    journalPage: journalPageSlice,
  },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;

export default store;
