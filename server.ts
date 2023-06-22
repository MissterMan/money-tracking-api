import express, { Express } from "express";
import dotenv from "dotenv";
import router from "./src/routes/route";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/api", router);

app.listen(port, () => {
  console.log(`⚡[server]: Server is running at http://localhost:${port}`);
});
