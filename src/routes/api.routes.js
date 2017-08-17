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

module.exports = router;
