const express = require('express');
const app = express();
const port = 3001;
const { reviews, db } = require('../models/index.js');

app.get('/reviews', (req, res) => {
  let page = 1;
  let count = 5;
  let sort = 'newest';
  let product_id = req.query.product_id;
  reviews.getReviews(page, count, sort, product_id)
    .then((response) => {
      console.log('success getting reviews: ', response);
      res.send(response);
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

app.put('/reviews/:review_id/helpful', (req, res) => {
  let id = req.params.review_id;
  reviews.updateHelpful(id)
    .then((response) => {
      console.log('successfully marked as helpful');
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log('error updating helpfulness: ', error);
      res.sendStatus(500);
    })
});

app.put('/reviews/:review_id/report', (req, res) => {
  let id = req.params.review_id;
  reviews.updateReport(id)
    .then((response) => {
      console.log('successfully reported');
      res.sendStatus(204);
    })
    .catch((error) => {
      console.log('report not processed: ', error);
      res.sendStatus(500);
    })
});





app.listen(port, () => {
  console.log(`Listening on ${port}`);
})
// let close = () => {
//   server.close(() => {
//     db.close();
//   });
// }

module.exports = app;