const {Pool} = require('pg')

let stringdb = process.env.DATABASE_URL;

if (stringdb == null || stringdb == "") {
  stringdb = 'postgres://postgres:123@localhost:5432/dvdrental'
}

const pool = new Pool({
  connectionString:stringdb,
  ssl: {
    rejectUnauthorized: false
  }
});


module.exports = pool;