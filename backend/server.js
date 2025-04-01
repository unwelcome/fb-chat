const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./routers/router.js');
require('dotenv').config();

const app = express();
const PORT = 3000;
const sessions = {}; 

// Проверка NODE_ENV
console.log('NODE_ENV:', process.env.NODE_ENV);

// Middleware для парсинга JSON
app.use(bodyParser.json());

//Middleware для сессий
app.use(session({
  secret: 'top-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
  },
  store: {
    get: (sid, callback) => {
      callback(null, sessions[sid] || null);
    },
    set: (sid, session, callback) => {
      sessions[sid] = session;
      callback(null);
    },
    destroy: (sid, callback) => {
      delete sessions[sid];
      callback(null);
    },
  },
  genid: (req) => {
    return uuidv4();
  }
}));

//роутинг  
app.use('/api', router);
 
// Отдача статики (собранного фронтенда)
if (process.env.NODE_ENV === 'production') {
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