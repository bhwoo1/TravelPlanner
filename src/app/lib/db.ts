import mysql from "mysql2/promise";

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const db = process.env.DB_DBNAME;
const port = process.env.DB_PORT;


export const Pool = mysql.createPool({
  host: host,
  port: Number(port),
  user: user,
  password: password,
  database: db,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});