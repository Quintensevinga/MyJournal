const Router = require('koa-router');
const controllers = require('./controllers');

const router = new Router();

router.post('/journal', controllers.createJournal);

router.get('/journals', controllers.getAllJournals);

router.get('/journal/:journalId', controllers.getJournalData);

router.get('/favorites', controllers.getAllFavorites);

router.post('/journalEntry/:journalId', controllers.addJournalEntry);

router.put('/updateJournal/:journalId', controllers.updateJournal)

router.put('/journal/:journalId/entry/:entryId', controllers.updateJournalEntry);

router.put('/entry/:entryId', controllers.updateSingleJournalEntry);

router.delete('/journal/:journalId/entry/:entryId', controllers.deleteJournalEntry);

router.delete('/deleteJournal/:journalId', controllers.deleteJournal)

module.exports = router;