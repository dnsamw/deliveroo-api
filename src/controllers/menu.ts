import { findOneMenu, updateMenuById, createMenu } from "../services/menuService";
import { NextFunction, Response } from "express";
import { customRequest } from "../types/customDefinition";
import { ApiError } from "../util/ApiError";

export const updateMenu = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id: menuId } = req.menu;

    let body = req.body;

    const menu = await findOneMenu({ id: menuId });

    if (!menu) {
      throw new ApiError(400, "Menu not found");
    }

    const updated = await updateMenuById(body, parseInt(menuId, 10));

    return res.status(200).json({
      updated: updated[0],
      msg: updated[0] ? "Data updated successfully" : "failed to update",
      error: false,
    });
  } catch (err) {
    next(err);
  }
};

export const getMenuData = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json({
      data: req.menu,
      error: false,
    });
  } catch (err) {
    next(err);
  }
};


export const createNewMenu = async (
    req: customRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const menuData = req.body;
  
      const newMenu = await createMenu(menuData);
  
      return res.status(201).json({
        data: newMenu,
        msg: "Menu created successfully",
        error: false,
      });
    } catch (err) {
      // If it's an expected error (like validation error), create an ApiError
      if (err instanceof Error) {
        next(new ApiError(400, err.message));
      } else {
        // For unexpected errors, pass a generic error message
        next(new ApiError(500, "An error occurred while creating the menu"));
      }
    }
  };