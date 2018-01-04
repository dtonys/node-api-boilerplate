import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import routes from 'setup/routes';


export function createExpressApp() {
  // express
  const expressApp = express();

  // middleware
  expressApp.use(cookieParser());
  expressApp.use(bodyParser.json());
  expressApp.use(bodyParser.urlencoded({ extended: true }));

  // api routes
  expressApp.use(routes);
  return expressApp;
}

export function startExpressServer( expressApp ) {
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
