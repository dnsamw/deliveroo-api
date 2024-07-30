//src/services/restaurantService.ts
import { Op } from "sequelize";
import Restaurant from "../models/Restaurant";

export const createRestaurant = async (payload: any) => {
  const restaurant = await Restaurant.create(payload);
  return restaurant;
};

export const getRestaurantById = async (id: number) => {
  const restaurant = await Restaurant.findByPk(id);
  if (!restaurant) {
    throw new Error("restaurant not found");
  }
  return restaurant;
};

export const restaurantExists = async (
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

  const menus = await Restaurant.findAll({ where: where });
  return menus.length > 0;
};


export const findOneRestaurant = async (options: any) => {
  if (!options.id) {
    throw new Error("Please provide restaurant id ");
  }
  const where = {
    [Op.or]: [] as any,
  };

  if (options.id) {
    where[Op.or].push({ id: options.id });
  }

  const restaurant = await Restaurant.findOne({
    where,
  });
  return restaurant;
};

export const updateRestaurantById = (restaurant: any, restaurantId: number) => {
  if (!restaurant && !restaurantId) {
    throw new Error("Please provide restaurant data and/or restaurant id to update");
  }
  if (restaurantId && isNaN(restaurantId)) {
    throw new Error("Invalid restaurant id");
  }
  if (restaurant.id || restaurantId) {
    const id = restaurant.id || restaurantId;

    return Restaurant.update(restaurant, {
      where: { id: id },
    });
  }
};

export const deleteRestaurantById = (restaurantId: number) => {
  if (!restaurantId) {
    throw new Error("Please provide restaurant id to delete");
  }
  if (restaurantId && isNaN(restaurantId)) {
    throw new Error("Invalid restaurant id");
  }

  return Restaurant.destroy({
    where: { id: restaurantId },
  });
};


export const getRestaurantsPaginated = async (page: number = 1, pageSize: number = 10) => {
    const offset = (page - 1) * pageSize;
    
    const { count, rows } = await Restaurant.findAndCountAll({
      limit: pageSize,
      offset: offset,
      order: [['id', 'ASC']], // You can change the ordering as needed
    });
  
    const totalPages = Math.ceil(count / pageSize);
  
    return {
      restaurants: rows,
      pagination: {
        currentPage: page,
        pageSize: pageSize,
        totalItems: count,
        totalPages: totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  };