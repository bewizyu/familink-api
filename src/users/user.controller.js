const _ = require('lodash');
const userServices = require('./user.services');
const security = require('../routes/security');

function exportUser(user) {
  return _.pick(user, ['phone', 'firstName', 'lastName', 'email', 'profile']);
}

function signIn(req, res) {
  userServices.createUser(
    req.body.phone,
    req.body.password,
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.profile,
  )
    .then((user) => {
      res.status(200).json(exportUser(user));
    })
    .catch((e) => {
      const message = e.message || 'Internal server error';
      const status = e.message ? 400 : 500;
      res.status(status).json({ message });
    });
}

function logIn(req, res) {
  security.doLogin(req.body.phone, req.body.password)
    .then((isMatch) => {
      if (isMatch) {
        const token = security.generateToken(req.body.phone);
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

function forgottenPassord(req, res) {
  security.forgottenPassord(req.body.phone)
    .then(() => {
      res.status(204).send();
    })
    .catch((e) => {
      const message = e.message || 'Internal server error';
      const status = e.message ? 400 : 500;
      res.status(status).json({ message });
    });
}

function updateUser(req, res) {
  userServices.updateUser(
    req.user._id,
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.profile,
  )
    .then((user) => {
      res.status(200).json(exportUser(user));
    })
    .catch((e) => {
      const message = e.message || 'Internal server error';
      const status = e.message ? 400 : 500;
      res.status(status).json({ message });
    });
}

function getUsers(req, res) {
  userServices.getUsers()
    .then((users) => {
      res.status(200).json(_.map(users, user => exportUser(user)));
    })
    .catch(() => {
      res.status(500).json({ message: 'Internal server error' });
    });
}

module.exports = {
  signIn,
  logIn,
  forgottenPassord,
  getUsers,
  updateUser,
};
