const Router = require('koa-router');
const controllers = require('./controllers');

const router = new Router();

// route for adding a journal
router.post('/journals', controllers.createJournal);

// route for getting all journals: title and covercolor only
router.get('/journals', controllers.getAllJournals);

module.exports = router;