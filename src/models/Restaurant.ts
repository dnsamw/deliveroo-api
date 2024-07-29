import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../db/connection";

class Restaurant extends Model {
  public id!: number;
  public name!: string;
  public thumbnail!: string | null;
  public about!: string | null;
  public allergens_info!: string | null;
  public telephone!: string | null;
  public hygiene_description!: string | null;
  public hygiene_rating!: number | null;
  public hygiene_rating_image!: string | null;
  public hygiene_rating_url!: string | null;
  public address!: string | null;
  public latitude!: number | null;
  public longitude!: number | null;
  public notes!: string | null;

  // timestamps!
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Restaurant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    thumbnail: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    allergens_info: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    telephone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    hygiene_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    hygiene_rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    hygiene_rating_image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    hygiene_rating_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 8),
      allowNull: true,
    },
    longitude: {
      type: DataTypes.DECIMAL(11, 8),
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "restaurant",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);


export default Restaurant;