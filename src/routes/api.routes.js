const express = require('express');
const security = require('../routes/security');

const router = express.Router();

const userRoutes = require('../users/user.controller');
const profilesRoutes = require('../profiles/profiles.controller');

router.use('/secured', security.checkAuthenticated);

// ##################################### //
// ############# PUBLIC API############# //
// ##################################### //

router.get('/public/profiles', profilesRoutes.getProfiles);
router.post('/public/sign-in', userRoutes.signIn);
router.post('/public/login', userRoutes.logIn);
router.post('/public/forgot-password', userRoutes.forgottenPassord);

// ##################################### //
// ############ SECURED API ############ //
// ##################################### //

router.get('/secured/users', userRoutes.getUsers);
router.put('/secured/users', userRoutes.updateUser);

router.get('/secured/users/contacts', userRoutes.getContacts);
router.delete('/secured/users/contacts/:idContact', userRoutes.deleteContact);
router.put('/secured/users/contacts/:idContact', userRoutes.updateContact);
router.post('/secured/users/contacts', userRoutes.createContact);

module.exports = router;
