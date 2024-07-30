//src/controllers/restaurant.ts

import { findOneRestaurant, updateRestaurantById, createRestaurant, getRestaurantsPaginated } from "../services/restaurantService";
import { NextFunction, Response } from "express";
import { customRequest } from "../types/customDefinition";
import { ApiError } from "../util/ApiError";
import { log } from "console";

export const updateRestaurant = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: menuId } = req.menu;

    let body = req.body;

    const menu = await findOneRestaurant({ id: menuId });

    if (!menu) {
      throw new ApiError(400, "Restaurant not found");
    }

    const updated = await updateRestaurantById(body, parseInt(menuId, 10));

    return res.status(200).json({
      updated: updated[0],
      msg: updated[0] ? "Data updated successfully" : "failed to update",
      error: false,
    });
  } catch (err) {
    next(err);
  }
};

export const getRestaurantData = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  log("getRestaurantData - ",req)
  try {
    return res.status(200).json({
      data: req.restaurant,
      error: false,
    });
  } catch (err) {
    next(err);
  }
};


export const createNewRestaurant = async (
    req: customRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const menuData = req.body;
  
      const newMenu = await createRestaurant(menuData);
  
      return res.status(201).json({
        data: newMenu,
        msg: "Restaurant created successfully",
        error: false,
      });
    } catch (err) {
      // If it's an expected error (like validation error), create an ApiError
      if (err instanceof Error) {
        next(new ApiError(400, err.message));
      } else {
        // For unexpected errors, pass a generic error message
        next(new ApiError(500, "An error occurred while creating the restaurant"));
      }
    }
  };

  export const getPaginatedRestaurants = async (
    req: customRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const pageSize = parseInt(req.query.pageSize as string) || 10;
  
      if (page < 1 || pageSize < 1) {
        throw new ApiError(400, "Invalid page or pageSize parameters");
      }
  
      const { restaurants, pagination } = await getRestaurantsPaginated(page, pageSize);
  
      return res.status(200).json({
        data: restaurants,
        pagination,
        error: false,
      });
    } catch (err) {
      if (err instanceof ApiError) {
        next(err);
      } else {
        next(new ApiError(500, "An error occurred while fetching restaurants"));
      }
    }
  };