import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import {
  createTransaction,
  deleteTransaction,
  getAllTransaction,
  updateTransaction,
} from "../repositories/repository";
import { TransactionData } from "../models/transactionData";

export const getAllTransactionController = async (
  req: Request,
  res: Response
) => {
  try {
    const result: object = await getAllTransaction();
    res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createTransactionController = async (
  req: Request,
  res: Response
) => {
  try {
    const data: TransactionData = req.body;

    if (!data.amount || !data.date || !data.source) {
      res.json({ message: "All data required" });
    }

    const uuid: string = uuidv4();
    const amount: number = data.amount;
    const date: Date = data.date;
    const source: string = data.source;
    const insertedAt: string = new Date()
      .toJSON()
      .slice(0, 19)
      .replace("T", " ");
    const updatedAt: string = insertedAt;

    const newTransaction: TransactionData = {
      uuid,
      amount,
      date,
      source,
      insertedAt,
      updatedAt,
    };

    const result = await createTransaction(newTransaction);
    res.json({ message: "Transaction Created", result });
  } catch (error) {
    console.error("Error creating transacion:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateTransactionController = async (
  req: Request,
  res: Response
) => {
  try {
    const { uuid } = req.params;
    const { amount, date, source } = req.body;

    if (!amount || !date || !source) {
      res.json({ message: "All data required" });
    }

    const updatedAt: string = new Date()
      .toJSON()
      .slice(0, 19)
      .replace("T", " ");

    const updatedTransaction: TransactionData = {
      uuid,
      amount,
      date,
      source,
      updatedAt,
    };

    const result: object = await updateTransaction(updatedTransaction);
    res.json(result);
  } catch (error) {
    console.error("Error creating transacion:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteTransactionController = async (
  req: Request,
  res: Response
) => {
  try {
    const { uuid } = req.params;

    const result: object = await deleteTransaction(uuid);
    res.json(result);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
