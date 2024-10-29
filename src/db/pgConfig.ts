import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config({ path: "./src/env/.env" });

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
  }
);

const initializeDatabase = async () => {
  try {
    console.log("Starting connection with the database... ⚠️".bgBlack.yellow);

    await sequelize.authenticate();

    console.log("Successful database connection!✅".bgBlack.green);
  } catch (error) {
    throw error;
  }
};

export default initializeDatabase;
