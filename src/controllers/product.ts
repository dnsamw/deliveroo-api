import {
    findOneProduct,
    updateProductById,
    createProduct,
    getProductById
  } from "../services/productService";
  import { NextFunction, Response } from "express";
  import { customRequest } from "../types/customDefinition";
  import { ApiError } from "../util/ApiError";
  
  export const updateProduct = async (
    req: customRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id: productId } = req.product;
  
      let body = req.body;
  
      const product = await findOneProduct({ id: productId });
  
      if (!product) {
        throw new ApiError(400, "Product not found");
      }
  
      const updated = await updateProductById(body, parseInt(productId, 10));
  
      return res.status(200).json({
        updated: updated[0],
        msg: updated[0] ? "Data updated successfully" : "failed to update",
        error: false,
      });
    } catch (err) {
      next(err);
    }
  };
  
  export const getProductData = async (
    req: customRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      return res.status(200).json({
        data: req.product,
        error: false,
      });
    } catch (err) {
      next(err);
    }
  };
  
  export const getOneProductById = async (
    req: customRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const menuRes = await getProductById(parseInt(req.params.id, 10));
      return res.status(200).json({
        data: menuRes,
        error: false,
      });
    } catch (err) {
      next(err);
    }
  };
  
  export const createNewProduct = async (
    req: customRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const productData = req.body;
  
      const newProduct = await createProduct(productData);
  
      return res.status(201).json({
        data: newProduct,
        msg: "Product Section created successfully",
        error: false,
      });
    } catch (err) {
      // If it's an expected error (like validation error), create an ApiError
      if (err instanceof Error) {
        next(new ApiError(400, err.message));
      } else {
        // For unexpected errors, pass a generic error message
        next(new ApiError(500, "An error occurred while creating the product"));
      }
    }
  };
  