const _ = require('lodash');
const userServices = require('./user.services');
const security = require('../routes/security');

function exportUser(user) {
  return _.pick(user, ['login']);
}

function signIn(req, res) {
  userServices.createUser(req.body.login, req.body.password)
    .then((user) => {
      res.status(200).json(exportUser(user));
    })
    .catch(() => {
      res.status(500).json({ message: 'Internal server error' });
    });
}

function logIn(req, res) {
  security.doLogin(req.body.login, req.body.password)
    .then((isMatch) => {
      if (isMatch) {
        const token = security.generateToken(req.body.login);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: 'Password is not valid' });
      }
    })
    .catch((e) => {
      const message = e.message || 'Internal server error';
      const status = e.message ? 400 : 500;
      res.status(status).json({ message });
    });
}

function logOut() {}

function getUsers(req, res) {
  userServices.getUsers()
    .then((users) => {
      res.status(200).json(_.map(users, user => exportUser(user)));
    })
    .catch(() => {
      res.status(500).json({ message: 'Internal server error' });
    });
}

function updateUsers() {}

module.exports = {
  signIn,
  logIn,
  logOut,
  getUsers,
  updateUsers,
};
