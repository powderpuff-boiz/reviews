const { app, close } = require('../../server/index.js')
const request = require('supertest')

afterAll((done) => { close(done) })
//Integration Tests
describe('/reviews', function () {
  jest.setTimeout(20000)
  it('Gets the /reviews endpoint', (done) => {
    request(app).get('/reviews')
      .expect(200, done)
  })
})

describe('/metaData', function () {
  jest.setTimeout(20000)
  it('Gets the /metaData endpoint', (done) => {
    request(app).get('/metaData')
      .expect(200, done)
  })
})

describe('/postReview', function () {
  jest.setTimeout(20000)
  it('Posts review to the /postReview endpoint', (done) => {
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

      ]
    }
    request(app).post('/postReview')
      .set('Content-type', 'application/json')
      .send(postRequest)
      .expect(200, done)
  })
})

describe('/reviews/:review_id/helpful', function () {
  jest.setTimeout(20000)
  it('Updates helpfulness', (done) => {
    request(app).put('/reviews/5/helpful')
      .expect(204, done)
  })
})

describe('/reviews/:review_id/report', function () {
  jest.setTimeout(20000)
  it('Updates reports', (done) => {
    request(app).put('/reviews/5/report')
      .expect(204, done)
  })
})
//puts return 204


