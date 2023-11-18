const Koa = require('koa');
const router = require('./router');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const http = require('http'); 
const fs = require('fs');

const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(router.routes());

const PORT = 3001; 

const callback = app.callback();

const httpServer = http.createServer(callback); 

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} (HTTP)`); 
});
