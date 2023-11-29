import { configureStore } from '@reduxjs/toolkit';
import writeJournalSlice from './slices/writeJournalSlice';
import journalGallerySlice from './slices/journalGallerySlice';

const store = configureStore({
  reducer: {
    writeJournal: writeJournalSlice,
    journalGallery: journalGallerySlice
  },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;

export default store;
