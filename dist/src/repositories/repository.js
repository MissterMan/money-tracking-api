"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransaction = exports.getAllTransaction = void 0;
const database_1 = __importDefault(require("../config/database"));
const getAllTransaction = () => {
    return new Promise((resolve, reject) => {
        database_1.default.getConnection((err, conn) => {
            if (err) {
                reject(err);
                return;
            }
            const db_query = "SELECT * FROM transactions";
            conn.query(db_query, (error, results) => {
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
exports.getAllTransaction = getAllTransaction;
const createTransaction = (data) => {
    return new Promise((resolve, reject) => {
        database_1.default.getConnection((err, conn) => {
            if (err) {
                console.error(err);
                reject(err);
                return;
            }
            const db_query = "INSERT INTO transactions (uuid, amount, date, source, insertedAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?)";
            conn.query(db_query, [
                data.uuid,
                data.amount,
                data.date,
                data.source,
                data.insertedAt,
                data.updatedAt,
            ], (error, results) => {
                conn.release();
                if (error) {
                    console.error(error);
                    reject(error);
                    return;
                }
                resolve(results);
            });
        });
    });
};
exports.createTransaction = createTransaction;
