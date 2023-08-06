import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWTConfig } from "../../jwt.config.ts";
import Keyv from "Keyv";
import Joi from "joi";
import {
  AUTH_HEADER_MISSING,
  INVALID_PASSWORD,
  UNAUTHORIZED,
} from "../shared/constants.ts";

const keyv = new Keyv();

const passwordRegex = new RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/);

const validatePassword = (value) => {
  if (!passwordRegex.test(String(value))) {
    throw new Error(INVALID_PASSWORD);
  }
};

export const joiSchemaUser = {
  register: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(16).required().external(validatePassword),
    phone: Joi.number().required(),
    address: Joi.string().required(),
  }),
  login: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

export const joiSchemaCartItem = {
  data: Joi.object().keys({
    id: Joi.string().required(),
    user_id: Joi.string().required(),
    product_id: Joi.string().required(),
    variant: Joi.number().required(),
    quantity: Joi.number().required(),
  }),
};

export const joiSchemaOrders = {
  data: Joi.object().keys({
    order_id: Joi.string().required(),
    user_id: Joi.string().required(),
    product_id: Joi.string().required(),
    variant: Joi.number().required(),
    quantity: Joi.number().required(),
    status: Joi.string().required(),
    item_subtotal: Joi.number().required(),
    shipping_price: Joi.number().required(),
    total_price: Joi.number().required(),
    payment_method: Joi.string().required(),
    shipping_address: Joi.string().required(),
    shipped_to: Joi.string().required(),
    transaction_id: Joi.string().required(),
    order_date: Joi.number().required(),
    delivery_date: Joi.number().required(),
  }),
};

export const validate = (schema) => async (req, res, next) => {
  if (schema) {
    try {
      const options = {
        errors: {
          wrap: { label: "" },
        },
        abortEarly: true,
      };
      const body = req.method == "GET" ? req.query : req.body;
      await schema.validateAsync(body, options);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
  next();
};

export const compareHash = (plainPassword, hashedPassword) =>
  bcrypt.compare(plainPassword, hashedPassword);

export const createHash = (plainPassword) => bcrypt.hash(plainPassword, 10);

export const verifyToken = (token) => jwt.verify(token, JWTConfig.secret);

export const createToken = (data) =>
  jwt.sign(data, JWTConfig.secret, { expiresIn: JWTConfig.ttl });

export const setCache = (key, value, ttl = undefined) =>
  keyv.set(key, value, ttl);

export const getCache = (key) => keyv.get(key);

export const delCache = (key) => keyv.delete(key);

export const clearCache = () => keyv.clear();

export const authMiddleware = async (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  if (token) {
    try {
      token = token.trim();
      /* ---------------------- Check For Blacklisted Tokens ---------------------- */
      const isBlackListed = await getCache(token);
      if (isBlackListed) {
        return res.status(401).json({ message: UNAUTHORIZED });
      }

      const decoded = await verifyToken(token);
      req.user = decoded;
      req.token = token;
      next();
    } catch (error) {
      return res.status(401).json({ message: UNAUTHORIZED });
    }
  } else {
    return res.status(400).json({ message: AUTH_HEADER_MISSING });
  }
};
