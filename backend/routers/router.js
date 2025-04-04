const express = require('express');
const router = express.Router();
const { 
  sendHello, 
  loginController, 
  signUpController, 
  secretController,
  jwtCheckController,
  filesUploadController
} = require('../controllers/controller');


// роуты
router.get('/data', sendHello);
router.post('/login', loginController);
router.post('/signup', signUpController);

router.post('/file-upload', filesUploadController);

//middleware проверки jwt
router.use('/auth', jwtCheckController);

// auth роуты
router.get('/auth/secret', secretController);


module.exports = router;