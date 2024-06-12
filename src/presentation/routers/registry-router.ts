import { Router } from "express";
import { ICommonUseCases } from "../../application/use-cases/common";
import { Registry } from "../../domain/entities/Registry";
import { Submeter } from "../../domain/entities/Submeter";

export default function RegistryRouter(registryUseCases: ICommonUseCases<Registry>, submeterUseCases: ICommonUseCases<Submeter>){
    const router = Router();

    router.post('/add', async (req, res) => {
        const submeter = await submeterUseCases.getOne({ name: req.body.submeter });
        if (await registryUseCases.getOne({ submeter: submeter?.id, registry: req.body.registry })) {
            res.status(400).send('Registry already exists');
            return;
        }
        const registry = await registryUseCases.add({ ...req.body, submeter: submeter });
        res.status(200).json(registry);
    });

    router.get('/get/:submeter/:registry', async (req, res) => {
        const submeter = await submeterUseCases.getOne({ name: req.params.submeter });
        const registry = await registryUseCases.getOne({ submeter: submeter?.id, registry: req.params.registry });
        res.status(200).json(registry);
    });

    router.get('/get/:submeter', async (req, res) => {
        const registries = await registryUseCases.getAllByFilter({ submeter: req.params.submeter });
        res.status(200).json(registries);
    });

    return router;
}