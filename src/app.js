const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const app = express();

// Connect Database
const dbURI = "mongodb://mongo-db:27017/docker-db";
console.log(dbURI)
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected...');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// for testing purposes
app.get('/test', (req, res) => {
  res.status(200).send({ text: 'Simple Node App Working!' });
});

routes(app);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});

module.exports = app;