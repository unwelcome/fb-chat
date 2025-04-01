const express = require('express');
const router = express.Router();
// const { 
//   sendHello, 
//   loginController, 
//   signUpController, 
//   secretController,
//   jwtCheckController
// } = require('../controllers/controller');
const {
  sessionMiddleware,
  sessionRegister, 
  sessionLogin, 
  sessionProfile, 
  sessionLogout, 
  sessionData
} = require('../controllers/sessionControllers');

// // роуты
// router.get('/data', sendHello);
// router.post('/login', loginController);
// router.post('/signup', signUpController);
// //middleware проверки jwt
// router.use('/auth', jwtCheckController);
// router.get('/auth/secret', secretController);

//session роуты
router.post('/register', sessionRegister);
router.post('/login', sessionLogin);
router.get('/profile', sessionMiddleware, sessionProfile);
router.post('/logout', sessionLogout);
router.get('/data', sessionData);

module.exports = router;