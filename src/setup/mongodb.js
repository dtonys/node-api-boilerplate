import fs from 'fs';
import path from 'path';

import mongoose from 'mongoose';


export function registerMongooseModels() {
  // Load all models into mongoose
  const modelAndSchemaFiles = fs.readdirSync( path.resolve(__dirname, '../models') );
  modelAndSchemaFiles.forEach((file) => {
    require('../models/' + file); // eslint-disable-line import/no-dynamic-require
  });
}

export function buildAllIndexes() {
  const db = mongoose.connection;
  const buildIndexPromises = Object.keys(db.models).map(( model ) => {
    return db.models[model].ensureIndexes();
  });
  return Promise.all(buildIndexPromises);
}

export function setupMongoose(dbName) {
  mongoose.set('debug', false);
  mongoose.Promise = global.Promise;

  registerMongooseModels();

  return new Promise(( resolve, reject ) => {
    const connection = mongoose.connect(`${process.env.MONGODB_CONNECTION_URL}/${dbName}`, {
      promiseLibrary: global.Promise,
      config: {
        autoIndex: true,
      },
    });
    connection
      .then(resolve)
      .catch(( error ) => {
        reject(error);
      });
  });
}
