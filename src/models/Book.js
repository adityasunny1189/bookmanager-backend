import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database.js";

const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    publishedDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

export default Book;
