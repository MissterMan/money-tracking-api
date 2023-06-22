import express, { Router } from "express";
import {
  createTransactionController,
  getAllTransactionController,
} from "../controllers/controller";

const router: Router = express.Router();

router.get("/transactions", getAllTransactionController);
router.post("/transactions", createTransactionController);

export default router;
