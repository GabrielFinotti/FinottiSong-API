import { Model, DataTypes } from "sequelize";
import sequelize from "../db/pgConfig";

class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public isPremium!: boolean;
  public profilePhoto?: string;
  public realName!: string;
  public role!: "dev" | "user";
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isPremium: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    profilePhoto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    realName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("dev", "user"),
      allowNull: false,
      defaultValue: "user",
    },
  },
  { sequelize, modelName: "User", tableName: "users", timestamps: true }
);

export default User;
