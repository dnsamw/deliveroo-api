import Restaurant from "./Restaurant";
import Menu from "./Menu";

Restaurant.hasMany(Menu, { foreignKey: 'restaurant_id' });
Menu.belongsTo(Restaurant, { foreignKey: 'restaurant_id' });

// You can add other associations here as well

export { Restaurant, Menu };