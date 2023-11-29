import { configureStore } from '@reduxjs/toolkit';
import writeJournalSlice from './slices/writeJournalSlice';

const store = configureStore({
  reducer: {
    writeJournal: writeJournalSlice,
  },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;

export default store;
