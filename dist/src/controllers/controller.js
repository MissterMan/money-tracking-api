"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransactionController = exports.getAllTransactionController = void 0;
const uuid_1 = require("uuid");
const repository_1 = require("../repositories/repository");
const getAllTransactionController = async (req, res) => {
    try {
        const result = await (0, repository_1.getAllTransaction)();
        res.json(result);
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.getAllTransactionController = getAllTransactionController;
const createTransactionController = async (req, res) => {
    try {
        const data = req.body;
        if (!data.amount || !data.date || !data.source) {
            res.json({ message: "All data required" });
        }
        const uuid = (0, uuid_1.v4)();
        const amount = data.amount;
        const date = data.date;
        const source = data.source;
        const insertedAt = new Date()
            .toJSON()
            .slice(0, 19)
            .replace("T", " ");
        const updatedAt = insertedAt;
        const newTransaction = {
            uuid,
            amount,
            date,
            source,
            insertedAt,
            updatedAt,
        };
        const result = await (0, repository_1.createTransaction)(newTransaction);
        res.json({ message: "Transaction Created", result });
    }
    catch (error) {
        console.error("Error creating transacion:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.createTransactionController = createTransactionController;
