const { reviews, db } = require('../../models/index.js')

afterAll((done) => {
  db.end()
    .then(() => {
      console.log('database closed successfully');
      done();
    })
    .catch((error) => {
      console.log('error closing database (unit tests): ', error);
    })
})

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

describe('metaData', function () {
  test('function should get metaData from database', function () {
    reviews.getMetaData()
      .then((metaData) => {
        expect(metaData.ratings).not.toBeNull();
        expect(metaData.recommended).not.toBeNull();
        expect(metaData.characteristics).not.toBeNull();
      })
      .catch((error) => {
        expect(error).toBeNull();
      })
  })
})

describe('postReview', function () {
  test('Create a new review', async () => {
    let postRequest = {
      "product_id": "5",
      "rating": 4,
      "summary": "Great shoes!",
      "body": "Now I can get to stomping!",
      "recommend": true,
      "name": "chingy",
      "email": "first.last@gmail.com",
      "photos": [


        "https://images.unsplash.com/photo-1560570803-7474c0f9af99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80"
        ,


        "https://images.unsplash.com/photo-1561693532-9ff59442a7db?ixlib=rb-1.2.1&auto=format&fit=crop&w=975&q=80"
        ,


        "https://images.unsplash.com/photo-1487349384428-12b47aca925e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"

      ],
      characteristics: { "14": 5, "15": 5 }
    }
    try {
      const countText = 'SELECT COUNT(*) FROM reviews'
      const count = await db.query(countText);
      //console.log('count before add: ', count.rows[0].count);
      await reviews.postReview(postRequest)
      const newCount = await db.query(countText);
      //console.log('count after add: ', newCount.rows[0].count);
      expect(Number(newCount.rows[0].count)).toBe(Number(count.rows[0].count) + 1);

    } catch (err) {
      expect(err).toBeNull();
    }
  });

})

describe('update helpfulness', function () {
  test('function should update helpfulness value', async function () {
    try {
      const helpfulCountText = 'SELECT helpfulness FROM reviews WHERE id=1';
      const helpfulCount = await db.query(helpfulCountText);
      // console.log('helpfulcount: ', helpfulCount.rows[0].helpfulness)
      await reviews.updateHelpful(1)
      const newHelpfulCount = await db.query(helpfulCountText);
      // console.log('newhelpfulcount: ', newHelpfulCount.rows[0].helpfulness)
      expect(newHelpfulCount.rows[0].helpfulness).toBe(helpfulCount.rows[0].helpfulness + 1);

    } catch (error) {
      expect(err).toBeNull();
    }
  })
})

describe('update reported', function () {
  test('function should update report boolean', async function () {
    try {
      const reportText = 'SELECT reported FROM reviews WHERE id=2855';
      const notReported = await db.query(reportText);
      await reviews.updateReport(2855);
      const reported = await db.query(reportText);
      expect(notReported.rows[0].reported).toBe(false);
      expect(reported.rows[0].reported).toBe(true);
      const resetReportText = "UPDATE reviews SET reported = 'False' WHERE id = 2855";
      await db.query(resetReportText);
    } catch (error) {
      console.log('error reporting: ', error)
      expect(error).toBeNull();
    }
  })
})

