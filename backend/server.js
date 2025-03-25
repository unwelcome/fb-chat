const express = require('express');
const path = require('path');
const pool = require('../db/db.js');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Проверка NODE_ENV
console.log('NODE_ENV:', process.env.NODE_ENV);
 
pool.query('SELECT * FROM users;', (err, res) => {
  if(err) {
    console.error('Error connecting to the database', err.stack);
  } else {
    console.log('Selected from users:', res.rows);
  }
});

app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  next();
});

// API-роуты
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from Express mzfk!' });
});

// Роут для получения всех пользователей
app.get('/api/users', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

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