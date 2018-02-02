import path from 'path';
import dotenv from 'dotenv';


async function bootstrap() {
  // load envs
  dotenv.load({
    path: path.resolve(__dirname, '../.env'),
  });

  // NOTE: Require env dependent files after envs are set
  const { createExpressApp, startExpressServer } = require('setup/express');
  const { setupMongoose } = require('setup/mongodb');

  // setup mongodb
  await setupMongoose( process.env.MONGODB_DATABASE_NAME );

  // setup express
  const expressApp = createExpressApp();
  await startExpressServer(expressApp);
}

bootstrap()
  .catch((error) => {
    console.log('bootstrap error'); // eslint-disable-line no-console
    console.log(error); // eslint-disable-line no-console
  });
