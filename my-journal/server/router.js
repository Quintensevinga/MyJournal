const Router = require('koa-router');
const controllers = require('./controllers/controllers');
const authControllers = require('./controllers/authControllers');
const {authenticate} = require('./middleware/authMiddleware');

const router = new Router();

router.post('/register', authControllers.register);
router.post('/login', authControllers.login);

router.post('/journal', authenticate, controllers.createJournal);
router.get('/journals', authenticate, controllers.getAllJournals);
router.get('/journal/:journalId', authenticate, controllers.getJournalData);
router.get('/favorites', authenticate, controllers.getAllFavorites);
router.post('/journalEntry/:journalId', authenticate, controllers.addJournalEntry);
router.put('/updateJournal/:journalId', authenticate, controllers.updateJournal)
router.put('/journal/:journalId/entry/:entryId', authenticate, controllers.updateJournalEntry);
router.put('/entry/:entryId', authenticate, controllers.updateSingleJournalEntry);
router.delete('/journal/:journalId/entry/:entryId', authenticate, controllers.deleteJournalEntry);
router.delete('/deleteJournal/:journalId', authenticate, controllers.deleteJournal)

module.exports = router;