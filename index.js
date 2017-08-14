const express = require('express');

const app = express();

const PORT = parseInt(process.env.PORT, 10) || 8080;

/**
 * CORS configurations
 */
app.all('/*', (req, res, next) => {
  // CORS headers
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

/**
 * Hello world
 */
app.get('/hello', (req, res) => {
  res.send('Hello test!');
});

/**
 * Undefined routes return 404 http code
 */
app.use((req, res) => {
  res.status(404).send({
    message: 'URL not found',
  });
});

app.listen(PORT, () => {
  console.log('Example app listening on port 3000!');
});
