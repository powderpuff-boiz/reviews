const express = require('express');
const app = express();
const port = 3000;
const db = require('../models/index.js');

let auth = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
auth();







app.listen(port, () => {
  console.log(`Listening on ${port}`);
})