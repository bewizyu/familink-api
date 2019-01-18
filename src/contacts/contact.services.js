const Chance = require('chance');
const _ = require('lodash');

const profilesConstantes = require('../profiles/profiles.constantes');

function checkGenerateNumbers(length = 20) {
  if (length < 0) return 0;
  if (length > 200) return 200;
  return length;
}

function generateMockContacts(length = 20) {
  const contactsLength = checkGenerateNumbers(length);

  const tmp = Array(contactsLength);

  const contacts = _.map(tmp, () => {
    const chance = new Chance();
    return {
      phone: _.replace(chance.phone({ country: 'fr', mobile: true }), /\s/g, ''),
      firstName: chance.first(),
      lastName: chance.last(),
      email: chance.email(),
      profile: profilesConstantes.PROFILES[_.random(0, 2)],
      gravatar: chance.avatar({ protocol: 'https' }),
      isFamilinkUser: _.random(0, 1) === 1,
      isEmergencyUser: false,
    };
  });

  // Only 4 emergency user in contacts list
  // if (contacts.length <= 4) {
  //
  // }

  return contacts;
}

module.exports = {
  generateMockContacts,
};
