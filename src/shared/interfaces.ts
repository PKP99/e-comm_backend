import { StatusCodes } from "http-status-codes";
import { BAD_REQUEST_NAME, TRY_AGAIN } from "./constants";

interface Error {
    name: string;
    message: string;
    stack?: string;
}

export interface IResponse<T> {
  status: number;
  message: string;
  data: {
    success?: T;
    failure?: T;
  };
}

export class ResponseError<T> extends Error {
    code: number;
    message: string;
    name: string;
    details: T | undefined;
    constructor(code?: number, name?: string, message = TRY_AGAIN, details?: T) {
      super();
      this.code = code ?? StatusCodes.BAD_REQUEST;
      this.name = name ?? BAD_REQUEST_NAME;
      this.message = message ?? TRY_AGAIN;
      this.details = details ?? ({} as T);
    }
  
    response?: {
      headers: { [key: string]: string };
      body: string;
    };
  }