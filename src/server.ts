import express, { json } from "express";
export * from "colors";
import dotenv from "dotenv";

dotenv.config({ path: "./src/env/.env" });

const app = express();
app.use(json());

app.listen(process.env.PORT, async () => {
  console.log("API iniciada".bgBlack.green);
});
