import { Sequelize } from "sequelize";
import { config } from "dotenv";
config({ path: "./src/config.env" });

let DB_PATH = "sqlite::memory:";

if (process.env.ENV === "production") {
    console.log("Connecting to production DB");
    DB_PATH = process.env.PROD_DB_PATH;
}

const sequelize = new Sequelize(DB_PATH, {
    dialect: "postgres",
});

const initializeDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected to DB");
    } catch (error) {
        console.log("Error connecting to DB: ", error);
        process.exit(1);
    }
};

initializeDatabase();

export default sequelize;
