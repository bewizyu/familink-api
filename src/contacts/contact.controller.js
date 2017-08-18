const contactsServices = require('./contact.services');

function getContacts(req, res) {
  contactsServices.getContacts(req.user.phone)
    .then((contacts) => {
      res.status(200).json(contacts);
    })
    .catch((e) => {
      const message = e.message || 'Internal server error';
      const status = e.message ? 400 : 500;
      res.status(status).json({ message });
    });
}

module.exports = {
  getContacts,
};
