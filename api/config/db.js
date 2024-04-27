import pkg from "pg";
import "dotenv/config";
const { Pool } = pkg;
const { DB_CONNECT_STRING } = process.env;

const config = {
  connectionString: DB_CONNECT_STRING,
  idleTimeoutMillis: 0,
  allowExitOnIdle: true,
};

const pool = new Pool(config);

export default pool;
