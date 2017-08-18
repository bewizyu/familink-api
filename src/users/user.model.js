const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const uniqueValidator = require('mongoose-unique-validator');
const Email = require('mongoose-type-mail');

const profilesConstantes = require('../profiles/profiles.constantes');

const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  phone: {
    type: String,
    unique: true,
    required: true,
    maxlength: 10,
    minlength: 10,
  },
  password: {
    type: String,
    required: true,
    maxlength: 4,
    minlength: 4,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: Email,
  },
  profile: {
    type: String,
    required: true,
    enum: profilesConstantes.PROFILES,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  contacts: [{
    phone: {
      type: String,
      unique: true,
      required: true,
      maxlength: 10,
      minlength: 10,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: Email,
    },
    profile: {
      type: String,
      required: true,
    },
    gravatar: {
      type: String,
    },
    isFamilinkUser: {
      type: Boolean,
      required: true,
    },
    isEmergencyUser: {
      type: Boolean,
      required: true,
    },
  }],
});

UserSchema.pre('save', function save(next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  return bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);

    // hash the password using our new salt
    return bcrypt.hash(user.password, salt, (e, hash) => {
      if (e) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      return next();
    });
  });
});

UserSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    return cb(null, isMatch);
  });
};


UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('user', UserSchema);
