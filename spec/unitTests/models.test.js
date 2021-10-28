const { reviews } = require('../../models/index.js')

describe('reviews', function () {
  test('function should get reviews from database', function () {
    reviews.getReviews()
      .then((response) => {
        for (var i = 0; i < response.length; i++) {
          expect(Object.Keys(response[i]).length).toBe(12);
        }
      })
  })
})