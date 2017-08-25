const _ = require('lodash');
const userServices = require('./user.services');
const security = require('../routes/security');

function exportUser(user) {
  return _.pick(user, ['phone', 'firstName', 'lastName', 'email', 'profile']);
}

function signIn(req, res) {
  try {
    userServices.createUser(
      req.body.phone,
      req.body.password,
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      req.body.profile,
      req.query.contactsLength,
    )
      .then((user) => {
        res.status(200).json(exportUser(user));
      })
      .catch((e) => {
        const message = e.message || 'Internal server error';
        const status = e.message ? 400 : 500;
        res.status(status).json({ message });
      });
  } catch (e) {
    const message = e.message || 'Internal server error';
    const status = e.message ? 400 : 500;
    res.status(status).json({ message });
  }
}

function logIn(req, res) {
  security.doLogin(req.body.phone, req.body.password)
    .then((isMatch) => {
      if (isMatch) {
        const token = security.generateToken(req.body.phone);
        res.status(200).json({ token });
      } else {
        res.status(400).json({ message: 'Password is not valid' });
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

function getAuthenticatedUser(req, res) {
  userServices.getUserById(req.user._id)
    .then((user) => {
      res.status(200).json(exportUser(user));
    })
    .catch(() => {
      res.status(500).json({ message: 'Internal server error' });
    });
}

function getContacts(req, res) {
  userServices.getContacts(req.user.phone)
    .then((contacts) => {
      res.status(200).json(contacts);
    })
    .catch((e) => {
      const message = e.message || 'Internal server error';
      const status = e.message ? 400 : 500;
      res.status(status).json({ message });
    });
}

function deleteContact(req, res) {
  userServices.deleteContact(req.user.phone, req.params.idContact)
    .then(() => {
      res.status(204).send();
    })
    .catch((e) => {
      const message = e.message || 'Internal server error';
      const status = e.message ? 400 : 500;
      res.status(status).json({ message });
    });
}

function updateContact(req, res) {
  userServices.updateContact(
    req.user.phone,
    req.params.idContact,
    req.body.phone,
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.profile,
    req.body.gravatar,
    req.body.isFamilinkUser,
    req.body.isFamilinkUser,
    req.body.isEmergencyUser,
  )
    .then(() => {
      res.status(204).send();
    })
    .catch((e) => {
      const message = e.message || 'Internal server error';
      const status = e.message ? 400 : 500;
      res.status(status).json({ message });
    });
}

function createContact(req, res) {
  userServices.addContact(
    req.user.phone,
    req.body.phone,
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.profile,
    req.body.gravatar,
    req.body.isFamilinkUser,
    req.body.isFamilinkUser,
    req.body.isEmergencyUser,
  )
    .then((contact) => {
      res.status(200).json(contact);
    })
    .catch((e) => {
      const message = e.message || 'Internal server error';
      const status = e.message ? 400 : 500;
      res.status(status).json({ message });
    });
}

module.exports = {
  signIn,
  logIn,
  forgottenPassord,
  getUsers,
  getAuthenticatedUser,
  updateUser,
  getContacts,
  deleteContact,
  updateContact,
  createContact,
};
