import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database.js";
import { Author } from "./Author.js";

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

Book.belongsTo(Author, {foreignKey: 'authorId', as: 'author'});

export default Book;
