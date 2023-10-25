const { Pool } = require('pg');
require('dotenv').config();

const PG_URI =
  'postgres://tgpodzpo:4ZEK6c-sgOkDAg1LwQ6cdcceZIk28NDs@suleiman.db.elephantsql.com/tgpodzpo';
//process.env.DATABASE_URI;

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
