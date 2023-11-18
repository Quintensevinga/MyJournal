const mongoose = require('./db');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  journals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Journal',
  }],
});

const User = mongoose.model('User', userSchema);

const journalEntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  edited: {
    type: Date,
    required: false,
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
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

module.exports = { User, Journal, JournalEntry };
