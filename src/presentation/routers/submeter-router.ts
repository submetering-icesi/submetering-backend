import { ICommonUseCases } from "../../application/use-cases/common";
import { Submeter } from "../../domain/entities/Submeter";
import express, { Request, Response } from "express";

export default function SubmeterRouter(submeterUseCases: ICommonUseCases<Submeter>) {
    const router = express.Router();

    router.get('/get/all', async (req: Request, res: Response) => {
        const submeters = await submeterUseCases.getAll();
        res.status(200).json(submeters);
    });

    return router;
}