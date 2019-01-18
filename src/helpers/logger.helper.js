const { createLogger, format, transports } = require('winston');
const config = require('config');

const {
  combine, timestamp, splat, printf, colorize,
} = format;

module.exports = createLogger({
  level: config.logLevel || 'debug',
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
    splat(),
  ),
  transports: [
    new transports.Console(),
  ],
});
