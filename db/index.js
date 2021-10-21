const fs = require('fs');
const csv = require('@fast-csv/parse');
// const model = require('../models/Review.js');
//const reviews = require('reviews/seeders/reviewsData/reviews.csv');
// /Users/annapeberdy / Desktop / SDC / reviews / seeders / reviewsData / reviews.csv



const stream = fs.createReadStream('/Users/annapeberdy/Desktop/SDC/reviews/seeders/reviewsData/reviews.csv')
csv.parseStream(stream, { headers: true })
  .transform(data => ({
    id: Number(data.id),
    product_id: data.product_id,
    rating: Number(data.rating),
    date: Date(),
    summary: data.summary,
    body: data.body,
    recommend: data.recommend === 'true',
    reported: data.reported === 'true',
    reviewer_name: data.reviewer_name,
    reviewer_email: data.reviewer_email,
    response: data.response,
    helpfulness: Number(data.helpfulness)
  }))
  .on('error', error => console.error(error))
  .on('data', row => console.log(`ROW=${JSON.stringify(row)}`))
  .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));


