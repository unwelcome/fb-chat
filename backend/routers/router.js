const express = require('express');
const router = express.Router();
const { 
  sendHello, 
  loginController, 
  signUpController, 
  secretController,
  jwtCheckController
} = require('../controllers/controller');

// роуты
router.get('/data', sendHello);
router.post('/login', loginController);
router.post('/signup', signUpController);
//middleware проверки jwt
router.use('/auth', jwtCheckController);
router.get('/auth/secret', secretController);

module.exports = router;