import { NextFunction, Request, Response } from "express";

export const errorHandler = (err: Error, _: Request, res: Response, __: NextFunction) => {
    console.log(err);
    res.status(500).send({ message: "Internal server error", details: err });
};