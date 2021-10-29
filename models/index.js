const db = require('../db/index.js');

module.exports = {
  reviews: {
    getReviews: function (page, count, sort, product_id) {
      //console.log('the request coming into the model: ', typeof product_id)
      return new Promise(async (resolve, reject) => {
        let text = 'SELECT * FROM getTheReviews($1, $2, $3)'
        let values = [page, count, product_id]
        // db
        //   .query(text, values)
        //   .then((res) => {
        //     resolve(res);
        //   })
        //   .catch((error) => {
        //     reject(error);
        //   })
        try {
          const reviewsResponse = await db.query(text, values)
          let photoPromises = [];
          //console.log('is this going to print or nah --------------->', reviewsResponse.rows)
          let reviews = reviewsResponse.rows;
          for (var i = 0; i < reviews.length; i++) {
            let reviewId = reviews[i].id;
            //console.log('this is the review id -------------->:', reviewId)
            let photosText = 'SELECT id, url FROM photos WHERE reviews_id = $1'
            let photosValues = [reviewId];
            photoPromises.push(db.query(photosText, photosValues))
          }
          let photos = await Promise.all(photoPromises);
          for (var j = 0; j < photos.length; j++) {
            //console.log('did this run ------------------------------->')
            reviews[j].photos = photos[j].rows;
          }
          //console.log('this is the final review obj: ', reviews)
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
    postReview: function () {
      // const promise = new Promise((resolve, reject) => {
      //   //product_id	integer	Required ID of the product to post the review for
      //   // rating	int	Integer (1-5) indicating the review rating
      //   // summary	text	Summary text of the review
      //   // body	text	Continued or full text of the review
      //   // recommend	bool	Value indicating if the reviewer recommends the product
      //   // name	text	Username for question asker
      //   // email	text	Email address for question asker
      //   // photos	[text]	Array of text urls that link to images to be shown
      //   // characteristics	object	Object of keys representing characteristic_id and values representing the review value for that characteristic. { "14": 5, "15": 5 //...}
      //   let reviewsText = 'INSERT INTO reviews()';
      //   let reviewsValues = '';

      //   let photosText = '';
      //   let photosValues = '';

      //   let characteristicsText = '';
      //   let characteristicsValues = '';
      //   db
      //     .query(text, values)
      //     .then(res => {
      //       console.log(res.rows[0])
      //       // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
      //     })
      //     .catch(e => console.error(e.stack))
      // })
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

