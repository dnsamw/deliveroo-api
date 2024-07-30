import { Op } from "sequelize";
import MenuSection from "../models/MenuSection";
import Menu from "../models/Menu";

export const createMenuSection = async (payload: any) => {
  const menuSection = await MenuSection.create(payload);
  return menuSection;
};

export const getMenuSectionById = async (id: number) => {
  const menuSection = await MenuSection.findByPk(id, {
    include: [{
      model: Menu,
      as: 'restaurant_data',
    }]
  });
  if (!menuSection) {
    throw new Error("menuSection not found");
  }
  return menuSection;
};

export const menuSectionExists = async (
  options: { email: string | null; mobile: string | null } = {
    email: null,
    mobile: null,
  }
) => {
  if (!options.email) {
    throw new Error("Please provide either of these options: email");
  }
  const where: any = {
    [Op.or]: [],
  };
  if (options.email) {
    where[Op.or].push({ email: options.email });
  }
  if (options.mobile) {
    where[Op.or].push({ email: options.mobile });
  }

  const menus = await MenuSection.findAll({ where: where });
  return menus.length > 0;
};


export const findOneMenuSection = async (options: any) => {
  if (!options.id) {
    throw new Error("Please provide menuSection id ");
  }
  const where = {
    [Op.or]: [] as any,
  };

  if (options.id) {
    where[Op.or].push({ id: options.id });
  }

  const menuSection = await MenuSection.findOne({
    where,
  });
  return menuSection;
};

export const updateMenuSectionById = (menuSection: any, menuId: number) => {
  if (!menuSection && !menuId) {
    throw new Error("Please provide menuSection data and/or menuSection id to update");
  }
  if (menuId && isNaN(menuId)) {
    throw new Error("Invalid menuSection id");
  }
  if (menuSection.id || menuId) {
    const id = menuSection.id || menuId;

    return MenuSection.update(menuSection, {
      where: { id: id },
    });
  }
};

export const deleteMenuSectionById = (menuId: number) => {
  if (!menuId) {
    throw new Error("Please provide menuSection id to delete");
  }
  if (menuId && isNaN(menuId)) {
    throw new Error("Invalid menuSection id");
  }

  return MenuSection.destroy({
    where: { id: menuId },
  });
};
