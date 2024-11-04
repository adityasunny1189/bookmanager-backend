import { DataTypes } from "sequelize";
import { sequelize } from "../utils/database";

const Author = sequelize.define('Author', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    biography: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bornDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

export default Author;
