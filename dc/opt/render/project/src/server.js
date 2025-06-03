// A simple Node.js callback listener for MTN MoMo
// Install dependencies with: npm install express body-parser

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Endpoint to receive MoMo callbacks
app.post('/momo/callback', (req, res) => {
  const log = {
    time: new Date().toISOString(),
    payload: req.body
  };

  // Log payload to a file
  fs.appendFile('momo_callbacks.log', JSON.stringify(log) + '\n', (err) => {
    if (err) console.error('Failed to write log:', err);
  });

  console.log('Received callback:', req.body);
  res.status(200).send('Callback received');
});

app.listen(port, () => {
  console.log(`MoMo Callback Server listening on port ${port}`);
});
