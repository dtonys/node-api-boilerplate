import path from 'path';
import repl from 'repl';
import dotenv from 'dotenv';
import mongoose from 'mongoose';


// Forces a hard re-require of a module
function requireUncached(module) {
  delete require.cache[require.resolve(module)];
  return require(module); // eslint-disable-line
}

// Reload the repl to allow code changes to propagate, without killing the process.
async function reloadRepl( replServer, setupMongoose ) {
  console.log('Reloading...'); // eslint-disable-line no-console

  await replServer.context.mongoose.disconnect();
  await setupMongoose( process.env.MONGODB_DATABASE_NAME );

  replServer.context.mongoose = requireUncached('mongoose');
  replServer.context.db = replServer.context.mongoose.connection;
  Object.keys(replServer.context.db.models).forEach(( modelName ) => {
    replServer.context[modelName] = replServer.context.db.models[modelName];
  });

  console.log('Done'); // eslint-disable-line no-console
}

async function bootstrap() {
  // load env
  dotenv.load({
    path: path.resolve(__dirname, '../.env'),
  });

  // NOTE: Require env dependent files after envs are set
  const setupMongoose = require('setup/mongodb');

  // setup mongodb
  await setupMongoose( process.env.MONGODB_DATABASE_NAME );

  const db = mongoose.connection;
  const replServer = repl.start({
    prompt: '[API] > ',
  });

  // Expose mongoose to the repl to make queries
  replServer.context.mongoose = mongoose;
  Object.keys(db.models).forEach(( modelName ) => {
    replServer.context[modelName] = db.models[modelName];
  });
  replServer.context.reload = reloadRepl.bind( null, replServer, setupMongoose );
}

bootstrap()
  .catch((error) => {
    console.log(error); // eslint-disable-line no-console
  });
