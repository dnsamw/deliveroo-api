import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../db/connection";

class Product extends Model {
  public id!: number;
  public menu_section_id!: number;
  public name!: string;
  public thumbnail!: string;
  public calories!: number | null;
  public price!: number | null;
  public short_description!: string | null;
  public description!: string | null;

  // timestamps!
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    menu_section_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "menu_section",
        key: "section_id",
      },
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    thumbnail: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    calories: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    short_description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "product",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Product;
