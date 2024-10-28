import { Model, DataTypes } from "sequelize";
import sequelize from "../db/pgConfig";
import User from "./User";
import Music from "./Music";

class Favorite extends Model {
  public id!: number;
  public userId!: number;
  public musicId!: number;
}

Favorite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    musicId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Music,
        key: "id",
      },
    },
  },
  { sequelize, modelName: "Favorite", tableName: "favorites", timestamps: true }
);

User.belongsToMany(Music, { through: Favorite, foreignKey: "userId" });
Music.belongsToMany(User, { through: Favorite, foreignKey: "musicId" });

export default Favorite;
