import Restaurant from "./Restaurant";
import Menu from "./Menu";
import MenuSection from "./MenuSection";
import Product from "./Product";


// Association between Restaurant and Menu
Restaurant.hasMany(Menu, { foreignKey: "restaurant_id" });

Menu.belongsTo(Restaurant, {
  foreignKey: "restaurant_id",
  as: "restaurant_data",
});

//Association between Menu and MenuSection

Menu.hasMany(MenuSection, {
  foreignKey: "menu_id",
  as: "sections_list",
});

MenuSection.belongsTo(Menu, {
  foreignKey: "menu_id",
  as: "parent_menu_data",
});


// Association between MenuSection and Product
Product.belongsTo(MenuSection, {
  foreignKey: "menu_section_id",
  as: "parent_menu_section_data",
});

MenuSection.hasMany(Product, {
  foreignKey: "menu_section_id",
  as: "products_list",
});

// You can add other associations here as well

export { Restaurant, Menu, MenuSection, Product };
