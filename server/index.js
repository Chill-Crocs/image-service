/* eslint-disable no-console */
const express = require('express');

const path = require('path');

const Name = require('../database/index.js');

const app = express();
const port = 3000;

app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.json());

app.get('/names', (req, res) => {
  Name.find({})
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
