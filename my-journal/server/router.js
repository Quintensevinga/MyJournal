const Router = require('koa-router');
const controllers = require('./controllers');

const router = new Router();

// route for adding a journal
router.post('/journal', controllers.createJournal);

// route for getting all journals: title and covercolor only
router.get('/journals', controllers.getAllJournals);

// route for getting al data from a specific journal
router.get('/journal/:journalId', controllers.getJournalData);

// get all favorites
router.get('/favorites', controllers.getAllFavorites);

// route for putting in a journal entry
router.post('/journalEntry/:journalId', controllers.addJournalEntry);

// route for updating a journal
router.put('/updateJournal/:journalId', controllers.updateJournal)

// updating a journal entry
router.put('/journal/:journalId/entry/:entryId', controllers.updateJournalEntry);
//updating single journal entry
router.put('/entry/:entryId', controllers.updateSingleJournalEntry);

//deleting journal entry
router.delete('/journal/:journalId/entry/:entryId', controllers.deleteJournalEntry);

//delete journal
router.delete('/deleteJournal/:journalId', controllers.deleteJournal)

module.exports = router;