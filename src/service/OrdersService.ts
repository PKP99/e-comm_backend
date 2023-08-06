import { IOrders } from "../db_schema/Orders/OrdersInterface.js";
import dbConn from "../../db.config.js";
import { Request } from "express";

export async function getOrders(req: Request): Promise<IOrders[]> {
  try {
    return new Promise((resolve, reject) => {
      dbConn.query("Select * from orders", (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  } catch (error) {
    console.log("OrdersService.ts", "getOrders", error, { req });
  }
}

export async function addOrder(req: Request): Promise<IOrders[]> {
  try {
    return new Promise((resolve, reject) => {
      dbConn.query(
        "INSERT INTO orders set ?",
        req.query.data,
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
    console.log("OrdersService.ts", "addOrder", error, { req });
  }
}

export async function updateOrder(req: Request): Promise<IOrders[]> {
  try {
    const dataToUpdate: any = req.query.data;
    return new Promise((resolve, reject) => {
      dbConn.query(
        "UPDATE orders SET status=?,shipping_address=?,shipping_to=? WHERE id = ?",
        [
          dataToUpdate.status,
          dataToUpdate.shipping_address,
          dataToUpdate.shipping_to,
          req.params.orderId,
        ],
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
    console.log("OrdersService.ts", "updateOrder", error, { req });
  }
}
