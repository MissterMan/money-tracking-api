"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_pool = mysql_1.default.createPool({
    connectionLimit: 10,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DB,
});
db_pool.getConnection((err, conn) => {
    if (err) {
        console.log("Error connecting to database");
        return;
    }
    console.log("Connected to database!");
    conn.release();
});
exports.default = db_pool;
