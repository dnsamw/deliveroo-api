import {
    findOneMenuSection,
    updateMenuSectionById,
    createMenuSection,
    getMenuSectionById
  } from "../services/menuSectionService";
  import { NextFunction, Response } from "express";
  import { customRequest } from "../types/customDefinition";
  import { ApiError } from "../util/ApiError";
  
  export const updateMenuSection = async (
    req: customRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id: menuSectionId } = req.menuSection;
  
      let body = req.body;
  
      const menuSection = await findOneMenuSection({ id: menuSectionId });
  
      if (!menuSection) {
        throw new ApiError(400, "Menu not found");
      }
  
      const updated = await updateMenuSectionById(body, parseInt(menuSectionId, 10));
  
      return res.status(200).json({
        updated: updated[0],
        msg: updated[0] ? "Data updated successfully" : "failed to update",
        error: false,
      });
    } catch (err) {
      next(err);
    }
  };
  
  export const getMenuSectionData = async (
    req: customRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      return res.status(200).json({
        data: req.menuSection,
        error: false,
      });
    } catch (err) {
      next(err);
    }
  };
  
  export const getOneMenuSectionById = async (
    req: customRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const menuRes = await getMenuSectionById(parseInt(req.params.id, 10));
      return res.status(200).json({
        data: menuRes,
        error: false,
      });
    } catch (err) {
      next(err);
    }
  };
  
  export const createNewMenuSection = async (
    req: customRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const menuSectionData = req.body;
  
      const newMenu = await createMenuSection(menuSectionData);
  
      return res.status(201).json({
        data: newMenu,
        msg: "Menu Section created successfully",
        error: false,
      });
    } catch (err) {
      // If it's an expected error (like validation error), create an ApiError
      if (err instanceof Error) {
        next(new ApiError(400, err.message));
      } else {
        // For unexpected errors, pass a generic error message
        next(new ApiError(500, "An error occurred while creating the menuSection"));
      }
    }
  };
  