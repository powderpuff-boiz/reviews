const db = require('../db/index.js');

module.exports = {
  reviews: {
    getReviews: function (page, count, sort, product_id) {
      console.log('the request coming into the model: ', typeof product_id)
      return new Promise((resolve, reject) => {
        let text = 'SELECT * FROM getTheReviews($1, $2, $3)'
        let values = [page, count, product_id]
        db
          .query(text, values)
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          })
      })
    }
    // getMetaData: function () {
    //   const promise = new Promise((resolve, reject) => {
    //     //do stuff
    //     //query string
    //     //query
    //   })
    // },
    // postReview: function () {
    //   const promise = new Promise((resolve, reject) => {

    //   })
    // },
    // updateHelpful: function () {
    //   const promise = new Promise((resolve, reject) => {

    //   })
    // },
    // updateReport: function () {
    //   const promise = new Promise((resolve, reject) => {

    //   })
    // }
  }
}

