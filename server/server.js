/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
const express = require('express');

const path = require('path');

const Item = require('../database/index.js');

const app = express();

app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.json());

app.get('/items', (req, res) => {
  Item.find({})
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

app.post('/items', (req, res) => {
  Item.create({
    _id: req.body._id,
    images: req.body.images,
    thumbs: req.body.thumbs,
    favorite: req.body.favorite,
  })
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.put('/items', (req, res) => {
  Item.findOneAndDelete({
    _id: req.body._id,
  })
    .then(() => res.sendStatus(201))
    .catch((err) => res.send(err));
});

app.patch('/items', (req, res) => {
  Item.findOne({
    _id: req.body._id,
  })
    .then((data) => {
      const change = !data.favorite;
      console.log(change);
      Item.findOneAndUpdate(req.body._id, {
        favorite: change,
      })
        .then(() => { console.log(`Item ID ${req.body._id}: change ${data.favorite} to ${change}!`); });
    })
    .then(() => res.sendStatus(204))
    .catch((err) => res.send(err));
});

module.exports = app;
