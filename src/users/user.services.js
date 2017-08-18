const log = require('../helpers/logger.helper');
const UserModel = require('./user.model');
const contactService = require('../contacts/contact.services');

function createUser(phone, password, firstName, lastName, email, profile, contactsLength) {
  let cl;
  if (contactsLength) {
    cl = parseInt(contactsLength, 10);
  }

  const newUser = new UserModel({
    phone,
    password,
    firstName,
    lastName,
    email,
    profile,
    contacts: contactService.generateMockContacts(cl),
  });

  return newUser.save()
    .then((user) => {
      log.info('User created', user);
      return Promise.resolve(user);
    })
    .catch((e) => {
      log.error('User error', e);
      return Promise.reject(e);
    });
}

function updateUser(id, firstName, lastName, email, profile) {
  const update = {};
  if (firstName) {
    update.firstName = firstName;
  }
  if (lastName) {
    update.lastName = lastName;
  }
  if (email) {
    update.email = email;
  }
  if (profile) {
    update.profile = profile;
  }

  return new Promise((resolve, reject) => {
    UserModel.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true, runValidators: true },
      (err, user) => {
        if (err) {
          reject(err);
        }
        resolve(user);
      });
  });
}

function getUsers() {
  const query = UserModel.find();
  return query.exec()
    .then((users) => {
      log.info('Get Users', users);
      return Promise.resolve(users);
    })
    .catch((e) => {
      log.error('Get users error', e);
      return Promise.reject(e);
    });
}

function getUserByPhone(phone) {
  return UserModel.findOne({ phone })
    .then((user) => {
      if (!user) {
        throw new Error('User not found');
      }
      log.info('Get User by login', user);
      return Promise.resolve(user);
    })
    .catch((e) => {
      log.error('Get users by login error', e);
      return Promise.reject(e);
    });
}

module.exports = {
  createUser,
  updateUser,
  getUsers,
  getUserByPhone,
};
