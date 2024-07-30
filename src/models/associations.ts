import Restaurant from "./Restaurant";
import Menu from "./Menu";
import MenuSection from "./MenuSection";

Restaurant.hasMany(Menu, { foreignKey: "restaurant_id" });
Menu.belongsTo(Restaurant, {
  foreignKey: "restaurant_id",
  as: "restaurant_data",
});

Menu.hasMany(MenuSection, { 
  foreignKey: "menu_id",
  as: "sections_list",
 });

MenuSection.belongsTo(Menu, {
  foreignKey: "menu_id",
  as: "parent_menu_data",
});

// You can add other associations here as well

export { Restaurant, Menu, MenuSection };
