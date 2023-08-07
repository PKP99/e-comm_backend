import { Request, Response, Router } from "express";
import StatusCodes from "http-status-codes";
import { getCategories, getProductById, getProducts } from "../service/ProductService";
import { IResponse, ResponseError } from "../shared/interfaces";
import { BAD_REQUEST_NAME, CATEGORIES, SUCCESS } from "../shared/constants";
import { IProduct } from "../db_schema/Products/ProductsInterface";

const router = Router();
const { OK } = StatusCodes;

/******************************************************************************
 *       "GET /api/v1/products/categories"
 ******************************************************************************/
router.get("/categories", (req: Request, res: Response) => {
  try {
    getCategories(req)
      .then((data) => {
        const resData: IResponse<string[]> = {
          status: OK,
          message: SUCCESS,
          data: {
            success: CATEGORIES,
          },
        };
        res.status(OK).json(resData);
      })
      .catch((err) => {
        const errData = {
          status: err?.code,
          message: err?.message,
          data: {
            failure: err?.details,
          },
        };
        res.status(err?.code).json(errData);
      });
  } catch (error) {
    console.log(
      "Products.ts",
      "getCategories",
      error,
      `Error occured GET API - /api/v1/products/categories`,
      { req, res }
    );
    throw new ResponseError(StatusCodes.BAD_REQUEST, BAD_REQUEST_NAME);
  }
});

/******************************************************************************
 *       "GET /api/v1/products/:category"
 ******************************************************************************/
router.get("/:category", (req: Request, res: Response) => {
  try {
    getProducts(req)
      .then((data) => {
        const resData: IResponse<IProduct[]> = {
          status: OK,
          message: SUCCESS,
          data: {
            success: data,
          },
        };
        res.status(OK).json(resData);
      })
      .catch((err) => {
        const errData = {
          status: err?.code,
          message: err?.message,
          data: {
            failure: err?.details,
          },
        };
        res.status(err?.code).json(errData);
      });
  } catch (error) {
    console.log(
      "Products.ts",
      "getProducts",
      error,
      `Error occured GET API - /api/v1/products/:categories`,
      { req, res }
    );
    throw new ResponseError(StatusCodes.BAD_REQUEST, BAD_REQUEST_NAME);
  }
});

/******************************************************************************
 *       "GET /api/v1/products/:productId"
 ******************************************************************************/
router.get("/:productId", (req: Request, res: Response) => {
  try {
    getProductById(req)
      .then((data) => {
        const resData: IResponse<IProduct[]> = {
          status: OK,
          message: SUCCESS,
          data: {
            success: data,
          },
        };
        res.status(OK).json(resData);
      })
      .catch((err) => {
        const errData = {
          status: err?.code,
          message: err?.message,
          data: {
            failure: err?.details,
          },
        };
        res.status(err?.code).json(errData);
      });
  } catch (error) {
    console.log(
      "Products.ts",
      "getProductById",
      error,
      `Error occured GET API - /api/v1/products/:productId`,
      { req, res }
    );
    throw new ResponseError(StatusCodes.BAD_REQUEST, BAD_REQUEST_NAME);
  }
});

export default router;
