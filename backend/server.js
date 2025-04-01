const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const router = require('./routers/router.js');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

// Проверка NODE_ENV
console.log('NODE_ENV:', process.env.NODE_ENV);

// Middleware для парсинга JSON
app.use(bodyParser.json());

// Middleware для парсинга JSON 
app.use(session({
  secret: 'top_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
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