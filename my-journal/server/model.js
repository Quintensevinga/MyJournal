const mongoose = require('./db');

const journalEntrySchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now,
  },
  edited: {
    type: Date,
    required: false,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  mood: {
    type: String,
    required: false,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const journalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  coverColor: {
    type: String,
    required: true,
  },
  entries: [journalEntrySchema],
});

const JournalEntry = mongoose.model('JournalEntry', journalEntrySchema);
const Journal = mongoose.model('Journal', journalSchema);


module.exports = { Journal, JournalEntry }