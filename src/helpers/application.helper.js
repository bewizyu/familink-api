const config = require('config');

function isDev() {
  return config.util.getEnv('NODE_ENV') === 'dev';
}

function isProd() {
  return config.util.getEnv('NODE_ENV') === 'prod';
}

module.exports = {
  isDev,
  isProd,
};
