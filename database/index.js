/* eslint-disable no-console */
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const db = mongoose.connect('mongodb://localhost/itemlist', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to Mongo'))
  .catch((err) => console.log(err));

const schema = new mongoose.Schema({
  name: String,
  images: Array,
  username: String,
  favorite: Boolean,
});

const Name = mongoose.model('Name', schema);

module.exports = db;
module.exports = Name;
