const mongoose = require('mongoose');
const log = require('./logger.helper');
const appHelper = require('./application.helper');

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

let db;

/**
 * Init the database connection and log events
 */
function initDatabaseConnection() {
  let uri = `${process.env.MONGODB_ADDON_URI}`;

  if (appHelper.isProd()) {
    options.user = process.env.MONGODB_ADDON_USER;
    options.pass = process.env.MONGODB_ADDON_PASSWORD;
  }

  if (appHelper.isDev()) {
    uri = `${uri}/${process.env.MONGODB_ADDON_DB}`;
  }


  mongoose.connect(uri, options);

  // Use native promises
  mongoose.Promise = global.Promise;

  db = mongoose.connection;
  db.on('error', (err) => {
    log.error('Database connection error', err);
  });

  db.once('open', () => {
    log.info('Connection with database succeeded.');
  });
}

function getDB() {
  if (!db) {
    throw new Error('DB not initialized');
  }
  return db;
}

module.exports = {
  initDatabaseConnection,
  getDB,
};
