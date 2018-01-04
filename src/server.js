import path from 'path';

import dotenv from 'dotenv';
import express from 'express';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';


function createExpressApp() {
  // express
  const expressApp = express();

  // middleware

  // api routes
  expressApp.get('/', (req, res) => {
    res.send('ok');
  });

  return expressApp;
}

function startServer( expressApp ) {
  return new Promise((resolve, reject) => {
    const listener = expressApp.listen(process.env.API_PORT, (err) => {
      if ( err ) {
        reject(err);
      }
      console.log(`API server listening on ${process.env.API_PORT} in ${expressApp.settings.env} mode.`); // eslint-disable-line no-console
      resolve(listener);
    });
  });
}

async function bootstrap() {
  // load env
  dotenv.load({
    path: path.resolve(__dirname, '../.env'),
  });

  // setup mailer
  // mailer.initialize();

  // setup mongodb
  // await connectToDatabase('auth_app');

  // setup express
  const expressApp = createExpressApp();

  // start server
  await startServer(expressApp);
}

bootstrap()
  .catch((error) => {
    console.log(error); // eslint-disable-line no-console
  });
