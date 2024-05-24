import { ICommonUseCases } from "../../application/use-cases/common";
import { Submeter } from "../../domain/entities/Submeter";
import express, { Request, Response } from "express";

export default function SubmeterRouter(submeterUseCases: ICommonUseCases<Submeter>) {
    const router = express.Router();

    router.get('/get/all', async (req: Request, res: Response) => {
        const submeters = await submeterUseCases.getAll();
        res.status(200).json(submeters);
    });

    router.get('/get/:name', async (req: Request, res: Response) => {
        const submeter = await submeterUseCases.getOne({ name: req.params.name });
        res.status(200).json(submeter);
    });

    return router;
}