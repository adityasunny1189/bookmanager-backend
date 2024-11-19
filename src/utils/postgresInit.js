import sequelize from "./database.js";
import Book from "../models/Book.js";
import Author from "../models/Author.js";
import associateModels from "../models/models.js";

export default function postgresInit() {
    const models = { Book, Author };
    associateModels(models);

    sequelize
        .sync()
        .then(() => {
            console.log("Created tables");
        })
        .catch((error) => {
            console.log("Error Creating tables: ", error);
            process.exit(1);
        });
}
