const { Journal } = require('./model');

const createJournal = async(ctx) => {
  try {
    const { title, coverColor } = ctx.request.body;

    const journal = new Journal({
      title,
      coverColor
    })

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

const getAllFavorites = async (ctx) => {
  try {
    const journals = await Journal.find();

    const favoriteEntries = [];

    for (const journal of journals) {
      const favoriteEntriesInJournal = journal.entries.filter((entry) => entry.favorite === true);
      favoriteEntries.push(...favoriteEntriesInJournal);
    }

    ctx.body = favoriteEntries;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed getting journals' };
  }
}

const addJournalEntry = async (ctx) => {
  try {
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

const updateSingleJournalEntry = async (ctx) => {
  try {
    const { entryId } = ctx.params;
    const updatedData = ctx.request.body;

    const journals = await Journal.find();

    let entry = null;
    let journalToSave = null;

    for (const journal of journals) {
      entry = journal.entries.find((entry) => entry._id.toString() === entryId);
      if (entry) {
        journalToSave = journal;
        break;
      }
    }
    Object.assign(entry, updatedData);
    await journalToSave.save();
    ctx.status = 200;
    ctx.body = entry;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to fetch entry' };
  }
}

const deleteJournalEntry = async (ctx) => {
  try {
    const { journalId, entryId } = ctx.params;

    const journal = await Journal.findById(journalId);

    const entryIndex = journal.entries.findIndex((entry) => entry._id.equals(entryId));
    
    journal.entries.splice(entryIndex, 1);

    await journal.save();

    ctx.status = 204; 
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to delete entry' };
  }
};

const deleteJournal = async (ctx) => {
  try {
    const { journalId } = ctx.params;

    const journal = await Journal.findByIdAndRemove(journalId);

    ctx.status = 204;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to delete journal' };
  }
};

const updateJournal = async (ctx) => {
  try {
    const { journalId } = ctx.params;
    const updatedData = ctx.request.body;

    const journal = await Journal.findByIdAndUpdate(journalId, updatedData);

    ctx.status = 200;
    ctx.body = journal;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error while updating journal' };
  }
};

module.exports = {
  createJournal,
  getAllJournals,
  getJournalData,
  getAllFavorites,
  addJournalEntry,
  updateJournalEntry,
  updateSingleJournalEntry,
  deleteJournalEntry,
  deleteJournal,
  updateJournal
};

