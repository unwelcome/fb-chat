const CryptoJS = require("crypto-js");
const JWT = require('jsonwebtoken');
const pool = require('../../db/db.js');
const fs = require('fs'); // Import the 'fs' module
const path = require('path'); // Import the 'path' module

const JWT_KEY = 'my secret key';
const users = [];

function checkUserExist(login, password=-1){
  for(let u of users){
    if(u.login === login && u.password === password) return true; // полная проверка для входа (сравнивается и логин и пароль)
    else if(u.login === login && password === -1) return true; // неполная проверка для создания аккаунта (сравнивается только логин)
  }
  return false;
}

const sendHello = (req, res) => {
  res.json({ message: 'Hello from Express mzfk!' });
}

const loginController = (req, res) => {
  const { login, password } = req.body;
  const passwordSHA256 = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

  if(checkUserExist(login, passwordSHA256)){
    console.log('login: user found!');

    const token = JWT.sign({ login: login, password: passwordSHA256 }, JWT_KEY);
    console.log(token);
    res.status(202).json({jwt: token});
  }
  else{
    console.log('login: user not found!');
    res.status(404).json({message: 'wrong data!'});
  }
}

const signUpController = (req, res) => {
  const { login, password, name, surname, tagname, email } = req.body;
  const passwordSHA256 = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);

  if(checkUserExist(login)){
    console.log('singup: user already exist!');
    res.status(405).json({message: 'user already exist!'});
  }
  else{
    console.log('signup: creating new user!');
    users.push({login: login, password: passwordSHA256});
    console.log(users);

    const token = JWT.sign({ login: login, password: passwordSHA256, exp: Math.floor(Date.now() / 1000) + (60 * 2)}, JWT_KEY);
    console.log(token);
    res.status(200).json({jwt: token});
  } 
}

const secretController = (req, res) => {
  res.status(200).json({secret: 'PHINEAS\'S PLAKTYPUS IS A PERRY THE PLATYPUS!!!'});
}

const jwtCheckController = (req, res, next) => {
  const [_, token] = req.headers.authorization.trim().split(' ');

  if(token === undefined){
    res.status(400).json({message: 'Invalid JWT!'});
    return;
  }

  JWT.verify(token, JWT_KEY, function(err, decoded) {
    if(!decoded){
      res.status(401).json({message: 'The token has expired'});
      return false;
    }
    else {
      if(checkUserExist(decoded.login, decoded.password)){
        next();
      }
      else{
        res.status(403).json({message: 'User not found!'});
        return false;
      }
    }
  });
}

const filesUploadController = (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const uploadedFiles = req.files.files;

  if (Array.isArray(uploadedFiles)) { // If multiple files were uploaded
    res.status(200).json({ message: `uploaded ${uploadedFiles.length} files` });
  } 
  else { // If only one file was uploaded
    res.status(200).json({ message: 'uploaded only one file' });
  }
}

const avatarController = (req, res) => {
  const avatarPath = path.join(__dirname, '../cache/test photo.jpg');
  if (!fs.existsSync(avatarPath)) {
    return res.status(404).send('Avatar not found');
  }
  // Read the image file
  fs.readFile(avatarPath, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading avatar');
    }

    // Set the Content-Type header to indicate an image
    res.writeHead(200, { 'Content-Type': 'image/jpeg' }); // Change image/jpeg to the correct MIME type for your avatar
    res.end(data); // Send the image data as the response
  });
}

// Роут для получения всех пользователей
// app.get('/api/users', async (req, res) => {
//   try {
//     const { rows } = await pool.query('SELECT * FROM users');
//     res.json(rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

module.exports = {
  sendHello,
  loginController,
  signUpController,
  secretController,
  jwtCheckController,
  filesUploadController,
  avatarController,
};