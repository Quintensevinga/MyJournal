const Router = require('koa-router');
const controllers = require('./controllers');

const router = new Router();

// route for adding a journal
router.post('/journals', controllers.createJournal);

// route for getting all journals: title and covercolor only
router.get('/journals', controllers.getAllJournals);

// route for getting al data from a specific journal
router.get('/journal/:journalId', controllers.getJournalData)

// route for putting in a journal entry
router.post('/journalEntry/:journalId', controllers.addJournalEntry)

// updating a journal entry
router.put('/journal/:journalId/entry/:entryId', controllers.updateJournalEntry)

module.exports = router;