import { Sequelize } from "sequelize";
import { config } from "dotenv";
config({ path: "./src/config.env" });

const PROD_DB_PATH = process.env.PROD_DB_PATH;
const ENV = process.env.ENV;
console.log("Env: ", ENV);

let DB_PATH = PROD_DB_PATH;

if (ENV === "development") {
    DB_PATH = "sqlite::memory:";
    console.log("Connecting to development DB");
}

export const sequelize = new Sequelize(DB_PATH);

try {
    await sequelize.authenticate();
    console.log("Connected to DB");
} catch (error) {
    console.log("Error connecting to DB: ", error);
    process.exit(1);
}
