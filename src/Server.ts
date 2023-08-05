import express, { NextFunction, Request, Response } from "express";
import StatusCodes from "http-status-codes";
import Routes from "./routes";
// import {MongoHelper} from './daos/mongoDb/DbClient';

const app = express();
const { BAD_REQUEST } = StatusCodes;

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(express.json({ limit: process.env.Payload_Size_Limit + "mb" }));
app.use(express.urlencoded({ extended: true }));

// Add APIs
app.use("/api/v1", Routes);

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  return res.status(BAD_REQUEST).json({
    error: err.message,
  });
});

// Export express instance
export default app;
