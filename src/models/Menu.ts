import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../db/connection";

class Menu extends Model {
  public id!: number;
  public restaurant_id!: number;
  public name!: string;
  public description!: string | null;
  public min_price!: number | null;
  public overall_rating!: number | null;

  // timestamps!
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Menu.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    restaurant_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Restaurant',
        key: 'id',
      }
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    min_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    overall_rating: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: true,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "menu",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);


export default Menu;