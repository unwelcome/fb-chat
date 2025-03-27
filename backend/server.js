const express = require('express');
const path = require('path');
const pool = require('../db/db.js');
const CryptoJS = require("crypto-js");
require('dotenv').config();
const bodyParser = require('body-parser');
var JWT = require('jsonwebtoken');
const { decode } = require('punycode');

const app = express();
const PORT = 3000;
const JWT_KEY = 'my secret key';

// Проверка NODE_ENV
console.log('NODE_ENV:', process.env.NODE_ENV);

// Middleware для парсинга JSON
app.use(bodyParser.json());
 
// pool.query('SELECT * FROM users;', (err, res) => {
//   if(err) {
//     console.error('Error connecting to the database', err.stack);
//   } else {
//     console.log('Selected from users:', res.rows);
//   }
// });

// app.use((req, res, next) => {
//   console.log(`Request URL: ${req.url}`);
//   next();
// });

const users = [];

function checkUserExist(login, password=-1){
  for(let u of users){
    if(u.login === login && u.password === password) return true; // полная проверка для входа (сравнивается и логин и пароль)
    else if(u.login === login && password === -1) return true; // неполная проверка для создания аккаунта (сравнивается только логин)
  }
  return false;
}

//jwt middleware
function checkJWT(req, res, next){
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

// API-роуты
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from Express mzfk!' });
});

app.post('/api/login', (req, res) => {
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
});

app.post('/api/signup', (req, res) => {
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
});

app.get('/api/secret', checkJWT, (req, res) => {

  res.status(200).json({secret: 'PHINEAS\'S PLAKTYPUS IS A PERRY THE PLATYPUS!!!'});

});

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

// Отдача статики (собранного фронтенда)
if (process.env.NODE_ENV === 'production') {
  console.log('Production build!');
  const frontendPath = path.join(__dirname, '../frontend/Talker/dist');
  app.use(express.static(frontendPath));

  // Все остальные запросы отправляем на index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});