const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Проверка NODE_ENV
console.log('NODE_ENV:', process.env.NODE_ENV);

app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  next();
});

// API-роуты
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from Express mzfk!' });
});

// Отдача статики (собранного фронтенда)
if (process.env.NODE_ENV === 'production') {
  console.log('node env correct!');
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