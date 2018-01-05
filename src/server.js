import path from 'path';
import dotenv from 'dotenv';
import {
  createSessionEncryptor,
} from 'helpers/session';

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
  createSessionEncryptor();

  // setup mongodb
  await setupMongoose( process.env.MONGODB_DATABASE_NAME );

  // setup express
  const expressApp = createExpressApp();
  await startExpressServer(expressApp);
}

bootstrap()
  .catch((error) => {
    console.log(error); // eslint-disable-line no-console
  });
