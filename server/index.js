const express = require('express');
const app = express();
const port = 3001;
const { reviews, db } = require('../models/index.js');

app.use(express.json());

app.get('/reviews', (req, res) => {
  let page = req.query.page || 1;
  let count = req.query.count || 5;
  let sort = req.query.sort || 'newest';
  let product_id = req.query.product_id;
  reviews.getReviews(page, count, sort, product_id)
    .then((response) => {
      console.log('success getting reviews: ', response);
      let resultObj = {
        product: product_id,
        page: page,
        count: count,
        results: response
      }
      res.json(resultObj);
    })
    .catch((error) => {
      console.log('error getting reviews: ', error);
      res.sendStatus(500);
    })
});

app.get('/metaData', (req, res) => {
  let product_id = req.query.product_id;
  reviews.getMetaData(product_id)
    .then((metaData) => {
      console.log('success getting meta data: ', metaData);
      res.send(metaData);
    })
    .catch((error) => {
      console.log('error getting meta data: ', error);
      res.sendStatus(500);
    })
});

app.post('/postReview', (req, res) => {
  let newReview = req.body;
  reviews.postReview(newReview)
    .then((response) => {
      console.log('success posting review');
      res.send(response);
    })
    .catch((error) => {
      console.log('error adding review: ', error);
      res.sendStatus(500);
    })
});

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





let server = app.listen(port, () => {
  console.log(`Listening on ${port}`);
})
let close = (done) => {
  server.close(() => {
    db.end()
      .then(() => {
        console.log('database closed successfully');
        done();
      })
      .catch((error) => {
        console.log('error closing database: ', error);
      })
  });
}

module.exports = {
  app,
  close
};