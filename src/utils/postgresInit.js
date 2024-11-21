import sequelize from "./database.js";

export default function postgresInit() {
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
