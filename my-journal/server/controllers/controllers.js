const { User, Journal } = require('../model');

const createJournal = async (ctx) => {
  try {
    const { title, coverColor } = ctx.request.body;
    console.log(ctx.request.body);

    const userId = ctx.state.user.userId;

    const journal = new Journal({
      user: userId,
      title,
      coverColor
    });

    const user = await User.findById(userId);
    user.journals.push(journal);

    await Promise.all([journal.save(), user.save()]);

    ctx.status = 201;
    ctx.body = { message: 'Journal created' };
  } catch (error) {
    ctx.body = { error: 'Error while creating a journal' };
  }
};

const getAllJournals = async (ctx) => {
  try {
    const userId = ctx.state.user.userId;
    console.log(userId);

    const user = await User.findById(userId).populate('journals');
    console.log(user);
    const journals = user.journals;
    console.log(journals);

    ctx.body = journals;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed getting journals' };
  }
}

const getJournalData = async (ctx) => {
  try {
    const userId = ctx.state.user.userId;
    const { journalId } = ctx.params;

    const journal = await Journal.findOne({ _id: journalId, user: userId });

    if (!journal) {
      ctx.status = 404;
      ctx.body = { error: 'Journal not found' };
      return;
    }

    ctx.body = journal;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed getting journal data' };
  }
}

const getAllFavorites = async (ctx) => {
  try {
    const userId = ctx.state.user.userId;
    const journals = await Journal.find({ user: userId });

    const favoriteEntries = journals.reduce((acc, journal) => {
      const favoriteEntriesInJournal = journal.entries.filter((entry) => entry.favorite === true);
      return acc.concat(favoriteEntriesInJournal);
    }, []);

    ctx.body = favoriteEntries;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed getting favorite entries' };
  }
}

const addJournalEntry = async (ctx) => {
  try {
    const userId = ctx.state.user.userId;
    const { journalId } = ctx.params;
    const { created, content, mood, favorite } = ctx.request.body;

    const journal = await Journal.findOne({ _id: journalId, user: userId });

    if (!journal) {
      ctx.status = 404;
      ctx.body = { error: 'Journal not found' };
      return;
    }

    const journalEntry = {
      created,
      content,
      mood,
      favorite
    };

    console.log(journalEntry);

    journal.entries.push(journalEntry);
    await journal.save();

    ctx.status = 201;
    ctx.body = journal;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Error while adding a new journal entry' };
  }
}

const updateJournalEntry = async (ctx) => {
  try {
    const userId = ctx.state.user.userId;
    const { journalId, entryId } = ctx.params;

    const journal = await Journal.findOne({ _id: journalId, user: userId });

    if (!journal) {
      ctx.status = 404;
      ctx.body = { error: 'Journal not found' };
      return;
    }

    const entry = journal.entries.id(entryId);

    if (!entry) {
      ctx.status = 404;
      ctx.body = { error: 'Journal entry not found' };
      return;
    }

    const updatedData = ctx.request.body;
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
    const userId = ctx.state.user.userId;
    const { entryId } = ctx.params;

    const journals = await Journal.find({ user: userId });

    let entry = null;
    let journalToSave = null;

    for (const journal of journals) {
      entry = journal.entries.id(entryId);

      if (entry) {
        journalToSave = journal;
        break;
      }
    }

    if (!entry) {
      ctx.status = 404;
      ctx.body = { error: 'Journal entry not found' };
      return;
    }

    const updatedData = ctx.request.body;
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
    const userId = ctx.state.user.userId;
    const { journalId, entryId } = ctx.params;

    const journal = await Journal.findOne({ _id: journalId, user: userId });

    if (!journal) {
      ctx.status = 404;
      ctx.body = { error: 'Journal not found' };
      return;
    }

    const entry = journal.entries.id(entryId);

    if (!entry) {
      ctx.status = 404;
      ctx.body = { error: 'Journal entry not found' };
      return;
    }

    entry.remove();
    await journal.save();

    ctx.status = 204;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to delete entry' };
  }
};

const deleteJournal = async (ctx) => {
  try {
    const userId = ctx.state.user.userId;
    const { journalId } = ctx.params;

    const journal = await Journal.findOneAndRemove({ _id: journalId, user: userId });

    if (!journal) {
      ctx.status = 404;
      ctx.body = { error: 'Journal not found' };
      return;
    }

    ctx.status = 204;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to delete journal' };
  }
};

const updateJournal = async (ctx) => {
  try {
    const userId = ctx.state.user.userId;
    const { journalId } = ctx.params;

    const journal = await Journal.findOne({ _id: journalId, user: userId });

    if (!journal) {
      ctx.status = 404;
      ctx.body = { error: 'Journal not found' };
      return;
    }

    const updatedData = ctx.request.body;

    Object.assign(journal, updatedData);

    await journal.save();

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
