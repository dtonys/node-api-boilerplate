import path from 'path';
import getPort from 'get-port';
import dotenv from 'dotenv';
import {
  createSessionEncryptor,
} from 'helpers/session';
import {
  setupMongoose,
  buildAllIndexes,
} from 'setup/mongodb';

import mongoose from 'mongoose';
import {
  createExpressApp,
  startExpressServer,
} from 'setup/express';


let _server = null;
export async function setupTestEnvironment() {
  const port = await getPort();
  dotenv.load({
    path: path.resolve(__dirname, '../../../.env'),
  });
  createSessionEncryptor();
  await setupMongoose(`${process.env.MONGODB_DATABASE_NAME}_test_${port}`);
  await buildAllIndexes();

  const expressApp = await createExpressApp();
  _server = await startExpressServer(expressApp, port);
  console.log(`Server ready on http://localhost:${port}`); // eslint-disable-line no-console
  return port;
}

export async function teardownTestEnvironment() {
  await mongoose.connection.db.dropDatabase();
  mongoose.connection.close();
  _server.close();
}
