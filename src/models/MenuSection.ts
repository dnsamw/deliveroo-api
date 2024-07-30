import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../db/connection";

class MenuSection extends Model {
  public section_id!: number;
  public menu_id!: number;
  public name!: string;

  // timestamps!
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

MenuSection.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    menu_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Menu',
        key: 'id',
      }
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "menu_section",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);


export default MenuSection;