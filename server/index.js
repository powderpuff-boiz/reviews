const express = require('express');
const app = express();
const port = 3001;
const models = require('../models/index.js');

app.get('/reviews', (req, res) => {
  let page = 1;
  let count = 5;
  let sort = 'newest';
  let product_id = '5';
  models.reviews.getReviews(page, count, sort, product_id)
    .then((response) => {
      console.log('success getting reviews: ', response.rows);
      res.send(response.rows);
    })
    .catch((error) => {
      console.log('error getting reviews: ', error);
      res.sendStatus(500);
    })
});

// app.get('/metaData', (req, res) => {

// });

// app.post('/postReview', (req, res) => {

// });

// app.put('/reviews/:review_id/helpful', (req, res) => {

// });

// app.put('/reviews/:review_id/report', (req, res) => {

// });





app.listen(port, () => {
  console.log(`Listening on ${port}`);
})

module.exports = app;