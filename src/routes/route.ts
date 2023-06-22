import express, { Router } from "express";
import {
  createTransactionController,
  deleteTransactionController,
  getAllTransactionController,
  updateTransactionController,
} from "../controllers/controller";

const router: Router = express.Router();

router.get("/transactions", getAllTransactionController);
router.post("/transactions", createTransactionController);
router.put("/transactions/:uuid", updateTransactionController);
router.delete("/transactions/:uuid", deleteTransactionController);

export default router;
