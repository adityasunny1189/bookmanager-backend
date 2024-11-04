import { Sequelize } from "sequelize";

const DB_PATH = process.env.DB_PATH;
const DEV_DB_PATH = 'sqlite::memory:';

export const sequelize = new Sequelize(DEV_DB_PATH);

try {
    await sequelize.authenticate();
    console.log("Connected to DB");
} catch (error) {
    console.log("Error connecting to DB: ", error);
    process.exit(1);
}
