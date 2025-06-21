import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";


interface UserAttributes {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
    password: string;
    deletedAt?: Date | null; 
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> { }

class User
    extends Model<UserAttributes, UserCreationAttributes>
    implements UserAttributes {
    public id!: number;
    public name!: string;
    public email!: string;
    public isActive!: boolean;
    public password!: string;
    public deletedAt?: Date | null;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        }
    },
    {
        tableName: "users",
        paranoid: true,
        timestamps: true,
        sequelize
    }
);

export default User