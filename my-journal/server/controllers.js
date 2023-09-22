const { Journal } = require('./model');
const mongoose = require('mongoose');

const createJournal = async(ctx) => {
  try {
    const { title, coverColor } = ctx.request.body;

    const journal = new Journal({
      title,
      coverColor
    })

    console.log(journal);
    await journal.save();

    ctx.status = 201;
    ctx.body = { message: 'Journal created' };
  } catch (error) {
    ctx.body = { error: 'Error while creating a journal' };
  }
};

const getAllJournals = async (ctx) => {
  try {
    const journals = await Journal.find();
    ctx.body = journals;
  } catch (error) {
    ctx.status = 500; 
    ctx.body = { error: 'Failed getting journals' };
  }
}

const getJournalData = async (ctx) => {
  try {
    const { journalId } = ctx.params;
    const journal = await Journal.findById(journalId);
    ctx.body = journal;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed getting journals' };
  }
}

const addJournalEntry = async (ctx) => {
  try {
    console.log('test');
    const { journalId } = ctx.params;
    const { created, content, mood, favorite } = ctx.request.body;

    const journal = await Journal.findById(journalId);

    const journalEntry = {
      created,
      content,
      mood,
      favorite
    }

    journal.entries.push(journalEntry);
    console.log(journal);
    await journal.save()

    ctx.status = 201; 
    ctx.body = journal ;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error while adding a new journal entry' };
  }
}

const updateJournalEntry = async (ctx) => {
  try {
    const { journalId, entryId } = ctx.params;

    const updatedData = ctx.request.body;

    const journal = await Journal.findById(journalId);

    const entry = journal.entries.find((entry) => entry._id.equals(entryId));

    Object.assign(entry, updatedData);

    await journal.save();
    ctx.status = 200;
    ctx.body = journal.entries;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error while updating journal entry' };
  }
};

module.exports = { createJournal, getAllJournals, getJournalData ,addJournalEntry, updateJournalEntry };

