
const { Client } = require('pg')

const client = new Client({
  user: 'annapeberdy',
  host: 'localhost',
  database: 'postgres',
  password: '',
  port: 5432,
})
client.connect()

module.exports = client;




