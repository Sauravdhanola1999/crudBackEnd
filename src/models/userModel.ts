import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/database";


interface UserAttributes {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
    password: string;
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
            allowNull: false,
            defaultValue: false
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false
        }
    },
    {
        tableName: "users",
        sequelize
    }
);

export default User