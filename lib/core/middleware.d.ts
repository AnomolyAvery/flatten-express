import { NextFunction, Request, Response } from "express";
export declare type Middleware = (req: Request, res: Response, next: NextFunction) => Promise<void>;
