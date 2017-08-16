const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');
const log = require('../helpers/logger.helper');
const userServices = require('../users/user.services');

const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecret';
log.info('JWT_SECRET', JWT_SECRET);

function generateToken(phone) {
  const payload = {
    phone,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: config.security.jwt.expiresIn });
}

function validateToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (e) {
    log.error('Error validating token : ', e);
    throw e;
  }
}

function checkAuthenticated(req, res, next) {
  const authHeader = req.get('Authorization');
  if (authHeader) {
    log.debug('checkAuthenticated Authorization : ', authHeader);
    try {
      const payload = validateToken(authHeader.split(' ')[1]);
      log.debug('checkAuthenticated payload', payload);
      userServices.getUserByPhone(payload.phone)
        .then((user) => {
          if (!user) {
            throw new Error();
          }
          req.user = _.pick(user, ['_id', 'login']);
          next();
        })
        .catch(() => {
          res.status(401).json({ message: 'Security: User extract from security token not found' });
        });
    } catch (e) {
      res.status(401).json({ message: 'Security token invalid or expired' });
    }
  }
}

function doLogin(phone, password) {
  return userServices.getUserByPhone(phone)
    .then((user) => {
      if (!user) {
        throw new Error('User not found');
      }

      return new Promise((resolve, reject) => {
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            return reject(err);
          }
          return resolve(isMatch);
        });
      });
    })
    .catch(e => Promise.reject(e));
}

module.exports = {
  checkAuthenticated,
  generateToken,
  doLogin,
};
