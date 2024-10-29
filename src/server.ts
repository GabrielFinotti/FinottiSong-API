import express, { json } from "express";
export * from "colors";
import dotenv from "dotenv";
import initializeDatabase from "./db/pgConfig";

dotenv.config({ path: "./src/env/.env" });

const app = express();
app.use(json());

app.listen(process.env.PORT, async () => {
  try {
    console.log("Starting the API!".bgBlack.cyan);

    await initializeDatabase();
  } catch (error) {
    console.error(error);
  }
});
