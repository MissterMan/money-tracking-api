import db_pool from "../config/database";
import { MysqlError, PoolConnection } from "mysql";
import { TransactionData } from "../models/transactionData";

export const getAllTransaction = (): Promise<object> => {
  return new Promise((resolve, reject) => {
    db_pool.getConnection((err: MysqlError, conn: PoolConnection) => {
      if (err) {
        reject(err);
        return;
      }

      const db_query = "SELECT * FROM transactions";
      conn.query(db_query, (error: MysqlError, results: object[]) => {
        conn.release();

        if (error) {
          reject(error);
          return;
        }

        if (results.length === 0) {
          reject(new Error("Data not found"));
          return;
        }

        resolve(results);
      });
    });
  });
};

export const createTransaction = (data: TransactionData): Promise<object> => {
  return new Promise<object>((resolve, reject) => {
    db_pool.getConnection((err: MysqlError, conn: PoolConnection) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }

      const db_query =
        "INSERT INTO transactions (uuid, amount, date, source, insertedAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)";

      conn.query(
        db_query,
        [
          data.uuid,
          data.amount,
          data.date,
          data.source,
          data.insertedAt,
          data.updatedAt,
        ],
        (error: MysqlError | null, results: object) => {
          conn.release();
          if (error) {
            console.error(error);
            reject(error);
            return;
          }
          resolve(results);
        }
      );
    });
  });
};

export const updateTransaction = (data: TransactionData): Promise<object> => {
  return new Promise<object>((resolve, reject) => {
    db_pool.getConnection((err: MysqlError, conn: PoolConnection) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }

      const db_query =
        "UPDATE transactions SET amount = ?, date = ?, source = ?, updatedAt = ? WHERE uuid = ?";

      conn.query(
        db_query,
        [data.amount, data.date, data.source, data.updatedAt, data.uuid],
        (error: MysqlError | null, results: object) => {
          conn.release();
          if (error) {
            console.error(error);
            reject(error);
            return;
          }
          resolve(results);
        }
      );
    });
  });
};

export const deleteTransaction = (uuid: string): Promise<object> => {
  return new Promise<object>((resolve, reject) => {
    db_pool.getConnection((err: MysqlError, conn: PoolConnection) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }

      const db_query = "DELETE FROM transactions WHERE uuid = ?";

      conn.query(
        db_query,
        [uuid],
        (error: MysqlError | null, results: object) => {
          conn.release();
          if (error) {
            console.error(error);
            reject(error);
            return;
          }
          resolve(results);
        }
      );
    });
  });
};
