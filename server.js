'use strict';

const { config } = require('./configs/config');

if (!config) throw new Error('configuration cannot be null/undefined');

const PORT = config.port;

const express = require('express');
const path = require('path');

const app = express();

// Configure static resources
app.use(express.static(path.join(__dirname, 'dist')));

// Configure server-side routing
app.get('*', (req, res) => {
  const dist = path.join(__dirname, 'dist', 'index.html');
  res.sendFile(dist);
});

// Open socket
app.listen(PORT, () => {
  console.log(`Started Express server on port ${PORT}`);
});
