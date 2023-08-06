import dbConn from "db.config";
import { Request } from "express";
import { JWTConfig } from "jwt.config";
import {
  compareHash,
  createHash,
  createToken,
  setCache,
} from "../library/utils";
import {
  EMAIL_ALREADY_EXISTS,
  SUCCESSFULLY_LOGGED_OUT,
} from "../shared/constants";
import { ulid } from "ulid";

export async function logIn(req: Request): Promise<any> {
  try {
    const User: any = new Promise((resolve, reject) => {
      dbConn.query(
        "Select * from users where email = ?",
        req.query.email,
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
    if (User.length > 0) {
      const isMatched = await compareHash(req.query.password, User[0].password);
      if (isMatched) {
        const token = await createToken({ id: User.id });
        return {
          user: User[0],
          access_token: token,
          token_type: "Bearer",
          expires_in: JWTConfig.ttl,
        };
      }
    }
  } catch (error) {
    console.log("UsersService.ts", "logIn", error, { req });
  }
}

export async function logOut(req: any): Promise<any> {
  try {
    const now = new Date();
    const expire = new Date(req.user.exp * 1000);
    const milliseconds = expire.getTime() - now.getTime();
    /* ----------------------------- BlackList Token ---------------------------- */
    setCache(req.token, req.token, milliseconds);

    return { message: SUCCESSFULLY_LOGGED_OUT };
  } catch (error) {
    console.log("UsersService.ts", "logOut", error, { req });
  }
}

export async function signUp(req: Request): Promise<[]> {
  try {
    const isExist: any = new Promise((resolve, reject) => {
      dbConn.query(
        "Select * from users where email = ?",
        req.body.email,
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
    if (isExist.length > 0) {
      throw new Error(EMAIL_ALREADY_EXISTS);
    }
    const hashedPassword = await createHash(req.body.password);
    const userData = {
      id: "User" + ulid(6),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
      address: req.body.address,
    };
    return new Promise((resolve, reject) => {
      dbConn.query("INSERT INTO users set ?", userData, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  } catch (error) {
    console.log("UsersService.ts", "signUp", error, { req });
  }
}
