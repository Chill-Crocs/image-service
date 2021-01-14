/* eslint-disable no-console */
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/namelist', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to Mongo'))
  .catch((err) => console.log(err));

const schema = mongoose.Schema({
  name: String,
  images: Array,
  username: String,
  favorite: Boolean,
});

const Name = mongoose.model('Name', schema);

module.exports = Name;
