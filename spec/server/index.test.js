const app = require('../../server/index.js')
const request = require('supertest')

//Integration Tests
describe('/reviews', function () {
  jest.setTimeout(20000)
  it('Gets the reviews endpoint', (done) => {
    request(app).get('/reviews')
      .expect(200, done)
  })
})


describe('dummy test', function () {
  test('should be true', function () {
    expect(true).toBe(true);
  })
})

