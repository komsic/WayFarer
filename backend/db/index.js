import { config } from 'dotenv';
import { Pool } from 'pg';

config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// eslint-disable-next-line no-console
pool.on('error', err => console.log(`Failed to connect to the database: ${err}`));

export default {
  query: (queryText, callback) => pool.query(queryText, callback),
};
