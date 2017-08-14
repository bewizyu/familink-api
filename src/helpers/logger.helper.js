const winston = require('winston');
const config = require('config');

const level = config.logLevel || 'debug';

const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level,
      timestamp() {
        return (new Date()).toISOString();
      },
    }),
  ],
});

module.exports = logger;
