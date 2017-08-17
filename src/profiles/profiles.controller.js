const constantes = require('./profiles.constantes');

module.exports = {
  getProfiles: (req, res) => {
    res.status(200).json(constantes.PROFILES);
  },
};
