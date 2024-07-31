//src/services/productService.ts

import { Op } from "sequelize";
import Product from "../models/Product";
// import MenuSection from "../models/MenuSection";

export const createProduct = async (payload: any) => {
    console.log("PAYLOADDDDDDDD",payload)
    try {
        const product = await Product.create(payload);
        return product;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
};

export const getProductById = async (id: number) => {
//   const product = await Product.findByPk(id, {
//     include: [{
//       model: MenuSection,
//       as: 'restaurant_data',
//     }]
//   });
//   if (!product) {
//     throw new Error("product not found");
//   }
//   return product;
};

export const productExists = async (
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

  const menus = await Product.findAll({ where: where });
  return menus.length > 0;
};


export const findOneProduct = async (options: any) => {
  if (!options.id) {
    throw new Error("Please provide product id ");
  }
  const where = {
    [Op.or]: [] as any,
  };

  if (options.id) {
    where[Op.or].push({ id: options.id });
  }

  const product = await Product.findOne({
    where,
  });
  return product;
};

export const updateProductById = (product: any, menuId: number) => {
  if (!product && !menuId) {
    throw new Error("Please provide product data and/or product id to update");
  }
  if (menuId && isNaN(menuId)) {
    throw new Error("Invalid product id");
  }
  if (product.id || menuId) {
    const id = product.id || menuId;

    return Product.update(product, {
      where: { id: id },
    });
  }
};

export const deleteProductById = (menuId: number) => {
  if (!menuId) {
    throw new Error("Please provide product id to delete");
  }
  if (menuId && isNaN(menuId)) {
    throw new Error("Invalid product id");
  }

  return Product.destroy({
    where: { id: menuId },
  });
};
