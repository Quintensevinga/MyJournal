const Koa = require('koa');
const router = require('./router');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(router.routes())

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

