const express = require('express');
const app = express();
const port = 3001;
const axios = require('axios');
const db = require('../models/index.js');

let auth = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
auth();

app.get('/reviews', (req, res) => {

});

app.get('/metaData', (req, res) => {

});

app.post('/postReview', (req, res) => {

});

app.put('/reviews/:review_id/helpful', (req, res) => {

});

app.put('/reviews/:review_id/report', (req, res) => {

});





app.listen(port, () => {
  console.log(`Listening on ${port}`);
})