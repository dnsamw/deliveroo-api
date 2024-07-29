import { encryptSync } from "../util/encrypt";
import { Op } from "sequelize";
import Menu from "../models/Menu";

export const createMenu = async (payload: any) => {
  const menu = await Menu.create(payload);
  return menu;
};

export const getMenuById = async (id: number) => {
  const menu = await Menu.findByPk(id);
  if (!menu) {
    throw new Error("menu not found");
  }
  return menu;
};

export const menuExists = async (
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

  const menus = await Menu.findAll({ where: where });
  return menus.length > 0;
};


export const findOneMenu = async (options: any) => {
  if (!options.id) {
    throw new Error("Please provide menu id ");
  }
  const where = {
    [Op.or]: [] as any,
  };

  if (options.id) {
    where[Op.or].push({ id: options.id });
  }

  const menu = await Menu.findOne({
    where,
  });
  return menu;
};

export const updateMenuById = (menu: any, menuId: number) => {
  if (!menu && !menuId) {
    throw new Error("Please provide menu data and/or menu id to update");
  }
  if (menuId && isNaN(menuId)) {
    throw new Error("Invalid menu id");
  }
  if (menu.id || menuId) {
    const id = menu.id || menuId;

    return Menu.update(menu, {
      where: { id: id },
    });
  }
};

export const deleteMenuById = (menuId: number) => {
  if (!menuId) {
    throw new Error("Please provide menu id to delete");
  }
  if (menuId && isNaN(menuId)) {
    throw new Error("Invalid menu id");
  }

  return Menu.destroy({
    where: { id: menuId },
  });
};
