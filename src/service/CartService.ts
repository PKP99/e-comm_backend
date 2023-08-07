import { ICartItem } from "../db_schema/Cart/CartInterface.js";
import dbConn from "../../db.config.ts";
import { Request } from "express";

export async function getCartItems(req: Request): Promise<ICartItem[]> {
  try {
    return new Promise((resolve, reject) => {
      dbConn.query("Select * from cart", (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  } catch (error) {
    console.log("CartService.ts", "getCartItems", error, { req });
  }
}

export async function addItemToCart(req: Request): Promise<ICartItem[]> {
  try {
    return new Promise((resolve, reject) => {
      dbConn.query(
        "INSERT INTO cart set ?",
        req.params.data,
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
    console.log("CartService.ts", "addItemToCart", error, { req });
  }
}

export async function updateCartItem(req: Request): Promise<ICartItem[]> {
  try {
    const dataToUpdate: any = req.params.data;
    return new Promise((resolve, reject) => {
      dbConn.query(
        "UPDATE cart SET quantity=? WHERE id = ?",
        [dataToUpdate.quantity, req.query.productId],
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
    console.log("CartService.ts", "updateCartItem", error, { req });
  }
}

export async function removeCartItem(req: Request): Promise<ICartItem[]> {
  try {
    return new Promise((resolve, reject) => {
      dbConn.query(
        "DELETE FROM cart WHERE id = ?",
        [req.query.productId],
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
    console.log("CartService.ts", "removeCartItem", error, { req });
  }
}
