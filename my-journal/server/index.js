const Koa = require('koa');
const router = require('./router');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const https = require('https'); 
const fs = require('fs'); 

const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(router.routes());

const PORT = 443;

const privateKey = fs.readFileSync('../private-key.pem', 'utf8');
const certificate = fs.readFileSync('../certificate.pem', 'utf8');

const credentials = { key: privateKey, cert: certificate };

const callback = app.callback(); 

const httpsServer = https.createServer(credentials, callback); 

httpsServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} (HTTPS)`);
});
