import { IProduct } from "../db_schema/Products/ProductsInterface.js";
import dbConn from "../../db.config.js";
import { Request } from "express";

export async function getProducts(req: Request): Promise<IProduct[]> {
  try {
    return new Promise((resolve, reject) => {
      dbConn.query(
        "Select * from product where category = ?",
        req.params.category,
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            const filteredResult = result.map(
              ({
                id,
                brand,
                name,
                original_price,
                special_price,
                review_rating,
                review_count,
                images,
                variants,
              }) => ({
                id,
                brand,
                name,
                original_price,
                special_price,
                review_rating,
                review_count,
                images,
                variants,
              })
            );
            resolve(filteredResult);
          }
        }
      );
    });
  } catch (error) {
    console.log("ProductService.ts", "getProducts", error, { req });
  }
}

export async function getProductById(req: Request): Promise<IProduct[]> {
  try {
    return new Promise((resolve, reject) => {
      dbConn.query(
        "Select * from product where id = ?",
        req.params.productId,
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  } catch (error) {
    console.log("ProductService.ts", "getProductbyId", error, { req });
  }
}
