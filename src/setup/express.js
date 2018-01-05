import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import compression from 'compression';

import routes from 'setup/routes';


export function handleErrorMiddleware( err, req, res, next ) {
  // NOTE: Add additional handling for errors here
  console.log(err);
  // Pass to express' default error handler, which will return
  // `Internal Server Error` when `process.env.NODE_ENV === production` and
  // a stack trace otherwise
  next(err);
}

function handleUncaughtErrors() {
  process.on('uncaughtException', ( error ) => {
    // NOTE: Add additional handling for uncaught exceptions here
    console.log(error);
    process.exit(1);
  });
  // NOTE: Treat promise rejections the same as an uncaught error,
  // as both can be invoked by a JS error
  process.on('unhandledRejection', ( error ) => {
    // NOTE: Add handling for uncaught rejections here
    console.log(error);
    process.exit(1);
  });
}

export function createExpressApp() {
  // express
  const expressApp = express();

  // middleware
  expressApp.use(helmet.hidePoweredBy());
  expressApp.use(compression());
  expressApp.use(cookieParser());
  expressApp.use(bodyParser.json());
  expressApp.use(bodyParser.urlencoded({ extended: true }));

  // api routes
  expressApp.use(routes);

  // Handle errors
  expressApp.use(handleErrorMiddleware);

  // Catch all 404
  expressApp.all('*', (req, res) => {
    res.status(404);
    res.send('API not found.');
  });
  return expressApp;
}

export function startExpressServer( expressApp ) {
  return new Promise((resolve, reject) => {
    const listener = expressApp.listen(process.env.API_PORT, (err) => {
      if ( err ) {
        reject(err);
      }
      handleUncaughtErrors();
      console.log(`API server listening on ${process.env.API_PORT} in ${expressApp.settings.env} mode.`); // eslint-disable-line no-console
      resolve(listener);
    });
  });
}
