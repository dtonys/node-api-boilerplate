import path from 'path';

import dotenv from 'dotenv';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser';

import {
  createExpressApp,
  startExpressServer,
} from 'setup/express';
import {
  setupMongoose,
} from 'setup/mongodb';


async function bootstrap() {
  // load env
  dotenv.load({
    path: path.resolve(__dirname, '../.env'),
  });

  // setup mailer
  // mailer.initialize();

  // setup mongodb
  await setupMongoose( process.env.MONGODB_DATABASE_NAME );

  // setup express
  const expressApp = createExpressApp();

  // start server
  await startExpressServer(expressApp);
}

bootstrap()
  .catch((error) => {
    console.log(error); // eslint-disable-line no-console
  });
