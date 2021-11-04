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
    getMetaData: function (product_id) {
      return new Promise(async (resolve, reject) => {

        let reviewsText = 'SELECT rating, recommend, id FROM reviews WHERE product_id=$1';
        let reviewsValue = [product_id];

        let characteristicsText = 'SELECT * FROM characteristic_reviews WHERE reviews_id=$1';
        let characteristicsValue;

        let nameText = 'SELECT name FROM characteristics WHERE id=$1';
        let nameValue;

        // let valueText = 'SELECT value FROM characteristic_reviews WHERE characteristic_id=$1 ';
        // let valueValue;

        try {
          const { rows } = await db.query(reviewsText, reviewsValue);
          let ratingsAndReviews = { ratings: {}, recommended: { true: 0, false: 0 }, characteristics: {} };
          let promises = []
          for (var i = 0; i < rows.length; i++) {
            let characteristicsValue = [rows[i].id];
            let currentVal = rows[i];
            if (ratingsAndReviews.ratings[currentVal.rating] === undefined) {
              ratingsAndReviews.ratings[currentVal.rating] = 1;
            } else {
              ratingsAndReviews.ratings[currentVal.rating]++;
            }
            if (currentVal.recommend === true) {
              ratingsAndReviews.recommended.true++;
            } else {
              ratingsAndReviews.recommended.false++;
            }
            promises.push(module.exports.getCharacteristics(rows[i].id))
          }
          let allCharacteristics = await Promise.all(promises)
          for (let i = 0; i < allCharacteristics.length; i++) {
            for (let key of Object.keys(allCharacteristics[i])) {
              if (ratingsAndReviews.characteristics[key] === undefined) {
                ratingsAndReviews.characteristics[key] = {
                  id: allCharacteristics[i][key].id,
                  values: [allCharacteristics[i][key].value]
                }
              } else {
                ratingsAndReviews.characteristics[key].values.push(allCharacteristics[i][key].value)
              }
            }
          }

          for (let key of Object.keys(ratingsAndReviews.characteristics)) {
            let value = ((ratingsAndReviews.characteristics[key].values.reduce((a, b) => a + b)) / ratingsAndReviews.characteristics[key].values.length).toFixed(16)
            ratingsAndReviews.characteristics[key].value = value
            delete ratingsAndReviews.characteristics[key].values
          }

          resolve(ratingsAndReviews);
        } catch (error) {
          reject(error);
        }
      })
    },
    postReview: function (review) {
      return new Promise(async (resolve, reject) => {
        let reviewsText = 'INSERT INTO reviews(product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
        let reviewsValues = [review.product_id, review.rating, Date.now(), review.summary, review.body, review.recommend, review.name, review.email];

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
              //console.log('new review id ------------>: ', addReviewValues.rows[0].id);
              photosPromises.push(db.query(photosText, photosValue))
            }
            await Promise.all(photosPromises);
          }
          if (review.characteristics !== undefined) {
            for (var key in review.characteristics) {
              characteristicValues = [review.characteristics[key], key, addReviewValues.rows[0].id];

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
  getCharacteristics: (review_id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const char_reviewsQueryString = 'SELECT * FROM characteristic_reviews WHERE reviews_id = $1'
        const charQueryString = 'SELECT * FROM characteristics WHERE id = $1'
        const char_reviewValues = [review_id]
        const char_reviews = await db.query(char_reviewsQueryString, char_reviewValues)

        let characteristics = {}
        const characteristicsPromises = []

        for (let i = 0; i < char_reviews.rows.length; i++) {
          let id = char_reviews.rows[i].characteristic_id
          characteristicsPromises.push(db.query(charQueryString, [id]))
        }

        let characteristicsArray = await Promise.all(characteristicsPromises)

        for (let i = 0; i < characteristicsArray.length; i++) {
          let row = characteristicsArray[i].rows[0]
          characteristics[row.name] = {
            id: row.id,
            value: char_reviews.rows[i].value
          }
        }

        resolve(characteristics)
      } catch (err) {
        reject(err)
      }
    })
  },
  db
}

