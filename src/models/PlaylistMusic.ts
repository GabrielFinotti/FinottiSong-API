import { Model, DataTypes } from "sequelize";
import { sequelize } from "../db/pgConfig";
import Playlist from "./Playlist";
import Music from "./Music";

class PlaylistMusic extends Model {
  public id!: number;
  public playlistId!: number;
  public musicId!: number;
  public order!: number;
}

PlaylistMusic.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    playlistId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Playlist,
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
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "PlaylistMusic",
    tableName: "playlist_musics",
    timestamps: false,
  }
);

Playlist.belongsToMany(Music, {
  through: PlaylistMusic,
  foreignKey: "playlistId",
});
Music.belongsToMany(Playlist, {
  through: PlaylistMusic,
  foreignKey: "musicId",
});

export default PlaylistMusic;
