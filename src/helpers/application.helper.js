const config = require('config');

function isDev() {
  return config.util.getEnv() === 'dev';
}

function isProd() {
  return config.util.getEnv() === 'prod';
}

module.exports = {
  isDev,
  isProd,
};
