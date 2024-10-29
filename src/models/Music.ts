import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/pgConfig";

class Music extends Model {
  public id!: number;
  public title!: string;
  public artist!: string;
  public genre?: string;
  public releaseDate?: Date;
  public duration!: number;
  public coverImageUrl?: string;
  public audioFileUrl!: string;
}

Music.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    releaseDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      validate: {
        isDate: true,
      },
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    coverImageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    audioFileUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
  },
  { sequelize, modelName: "Music", tableName: "musics", timestamps: true }
);

export default Music;
