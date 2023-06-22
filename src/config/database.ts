import mysql, { Connection, MysqlError } from "mysql";
import dotenv from "dotenv";
import { PoolConnection } from "mysql";

dotenv.config();

const db_pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
});

db_pool.getConnection((err: MysqlError, conn: PoolConnection) => {
  if (err) {
    console.log("Error connecting to database");
    return;
  }
  console.log("Connected to database!");
  conn.release();
});

export default db_pool;
