import { Request, Response, Router } from "express";
import StatusCodes from "http-status-codes";
import {
  getCartItems,
  addItemToCart,
  updateCartItem,
  removeCartItem,
} from "../service/CartService";
import { authMiddleware, joiSchemaCartItem, validate } from "../library/utils";
import { IResponse, ResponseError } from "../shared/interfaces";
import { BAD_REQUEST_NAME, SUCCESS } from "../shared/constants";
import { ICartItem } from "../db_schema/Cart/CartInterface";

const router = Router();
const { OK } = StatusCodes;

/******************************************************************************
 *       "GET /api/v1/cart"
 ******************************************************************************/
router.get("/", authMiddleware, (req: Request, res: Response) => {
  try {
    getCartItems(req)
      .then((data) => {
        const resData: IResponse<ICartItem[]> = {
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
      "Cart.ts",
      "getCartItems",
      error,
      `Error occured GET API - /api/v1/cart`,
      { req, res }
    );
    throw new ResponseError(StatusCodes.BAD_REQUEST, BAD_REQUEST_NAME);
  }
});

/******************************************************************************
 *       "POST /api/v1/cart/add"
 ******************************************************************************/
router.post(
  "/add",
  validate(joiSchemaCartItem),
  authMiddleware,
  (req: Request, res: Response) => {
    try {
      addItemToCart(req)
        .then((data) => {
          const resData: IResponse<ICartItem[]> = {
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
        "Cart.ts",
        "addItemToCart",
        error,
        `Error occured POST API - /api/v1/cart/add`,
        { req, res }
      );
      throw new ResponseError(StatusCodes.BAD_REQUEST, BAD_REQUEST_NAME);
    }
  }
);

/******************************************************************************
 *       "POST /api/v1/cart/update/:productId"
 ******************************************************************************/
router.post(
  "/update/:productId",
  authMiddleware,
  (req: Request, res: Response) => {
    try {
      updateCartItem(req)
        .then((data) => {
          const resData: IResponse<ICartItem[]> = {
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
        "Cart.ts",
        "updateCartItem",
        error,
        `Error occured POST API - /api/v1/cart/update/${req.params.productId}`,
        { req, res }
      );
      throw new ResponseError(StatusCodes.BAD_REQUEST, BAD_REQUEST_NAME);
    }
  }
);

/******************************************************************************
 *       "POST /api/v1/cart/remove/:productId"
 ******************************************************************************/
router.post(
  "/remove/:productId",
  authMiddleware,
  (req: Request, res: Response) => {
    try {
      removeCartItem(req)
        .then((data) => {
          const resData: IResponse<ICartItem[]> = {
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
        "Cart.ts",
        "removeCartItem",
        error,
        `Error occured POST API - /api/v1/cart/remove/${req.params.productId}`,
        { req, res }
      );
      throw new ResponseError(StatusCodes.BAD_REQUEST, BAD_REQUEST_NAME);
    }
  }
);

export default router;
