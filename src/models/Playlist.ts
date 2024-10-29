import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/pgConfig";
import User from "./User";

class Playlist extends Model {
  public id!: number;
  public name!: string;
  public userId!: number;
}

Playlist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  { sequelize, modelName: "Playlist", tableName: "playlists", timestamps: true }
);

User.hasMany(Playlist, { foreignKey: "userId" });
Playlist.belongsTo(User, { foreignKey: "userId" });

export default Playlist;
