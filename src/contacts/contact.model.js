const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');
const Email = require('mongoose-type-mail');

const Schema = mongoose.Schema;

// const ContactSchema = new Schema({
//   phone: {
//     type: String,
//     unique: true,
//     required: true,
//     maxlength: 10,
//     minlength: 10,
//   },
//   firstName: {
//     type: String,
//     required: true,
//   },
//   lastName: {
//     type: String,
//   },
//   email: {
//     type: Email,
//   },
//   profile: {
//     type: String,
//     required: true,
//   },
//   gravatar: {
//     type: String,
//   },
//   isFamilinkUser: {
//     type: Boolean,
//     required: true,
//   },
//   isEmergencyUser: {
//     type: Boolean,
//     required: true,
//   },
// });
//
// ContactSchema.plugin(uniqueValidator);

// module.exports = mongoose.model('contact', ContactSchema);
