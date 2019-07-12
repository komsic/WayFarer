import { config } from 'dotenv';
import { Pool } from 'pg';

config();

const env = process.env.NODE_ENV;

const testDb = process.env.TEST_DB;
const connectionString = (env === 'test') ? testDb : process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
});

export default {
  query: (queryText, callback) => pool.query(queryText, callback),
};
