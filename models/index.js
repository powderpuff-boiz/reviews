const db = require('../db/index.js');

module.exports = {
  reviews: {
    getReviews: function (page, count, sort, product_id) {
      //console.log('the request coming into the model: ', page)
      return new Promise((resolve, reject) => {
        db
          .query('SELECT * FROM getTheReviews(1, 5)')
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

