const db = require('../db/index.js');

module.exports = {
  reviews: {
    getReviews: function (page, count, sort, product_id) {
      return new Promise(async (resolve, reject) => {
        let text = 'SELECT * FROM getTheReviews($1, $2, $3)'
        let values = [page, count, product_id]
        try {
          const reviewsResponse = await db.query(text, values)
          let photoPromises = [];
          let reviews = reviewsResponse.rows;
          for (var i = 0; i < reviews.length; i++) {
            let reviewId = reviews[i].id;
            let photosText = 'SELECT id, url FROM photos WHERE reviews_id = $1'
            let photosValues = [reviewId];
            photoPromises.push(db.query(photosText, photosValues))
          }
          let photos = await Promise.all(photoPromises);
          for (var j = 0; j < photos.length; j++) {
            reviews[j].photos = photos[j].rows;
          }
          resolve(reviews)
        } catch (err) {
          reject(err);
        }
      })
    },
    // getMetaData: function () {
    //   const promise = new Promise((resolve, reject) => {
    //     //do stuff
    //     //query string
    //     //query
    //   })
    // },
    postReview: function (review) {
      return new Promise(async (resolve, reject) => {
        let reviewsText = 'INSERT INTO reviews(product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
        let reviewsValues = [review.product_id, review.rating, 10282021, review.summary, review.body, review.recommend, review.name, review.email];

        let photosText = 'INSERT INTO photos(url, reviews_id) VALUES($1, $2)';
        let photosValue = [];
        let photosPromises = [];

        let characteristicsText = 'INSERT INTO characteristic_reviews(value, characteristic_id, reviews_id) VALUES($1, $2, $3)';
        let characteristicsValues = [];
        let characteristicsPromises = [];
        try {
          const addReviewValues = await db.query(reviewsText, reviewsValues)
          if (review.photos.length > 0) {
            for (var i = 0; i < review.photos.length; i++) {
              photosValue = [review.photos[i], addReviewValues.rows[0].id];
              console.log('new review id ------------>: ', addReviewValues.rows[0].id);
              photosPromises.push(db.query(photosText, photosValue))
            }
            await Promise.all(photosPromises);
          }
          if (review.characteristics !== undefined) {
            for (var key in review.characteristics) {
              characteristicValues = [review.characteristics[key], key, addReviewValues.id];

              characteristicsPromises.push(db.query(characteristicsText, characteristicValues));
            }
            await Promise.all(characteristicsPromises);
          }
          resolve()
        } catch (err) {
          reject(err)
        }

      })
    },
    updateHelpful: function (id) {
      return new Promise(async (resolve, reject) => {
        let helpfulText = "UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = $1";
        let helpfulValue = [id];

        try {
          const updateHelpfulnessResponse = await db.query(helpfulText, helpfulValue);
          resolve();
        } catch (err) {
          reject(err)
        }
      })
    },
    updateReport: function (id) {
      return new Promise(async (resolve, reject) => {
        let reportText = "UPDATE reviews SET reported = 'True' WHERE id = $1";
        let reportValue = [id];

        try {
          const updateResponse = await db.query(reportText, reportValue);
          resolve()
        } catch (err) {
          reject(err)
        }
      })
    }
  },
  db
}

