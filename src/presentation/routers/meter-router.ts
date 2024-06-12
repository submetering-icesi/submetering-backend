import { Router } from "express";
import { IMeasurementUseCases } from "../../application/use-cases/measurement";
import { ICommonUseCases } from "../../application/use-cases/common";
import { Registry } from "../../domain/entities/Registry";

export default function MeterRouter(meteringUseCases: IMeasurementUseCases, registryUseCases: ICommonUseCases<Registry>) {
  const router = Router();

  router.get("/get-by-day/:submeter/:registry/:start/:end", async (req, res) => {
    console.log(req.params);
    const registry = await registryUseCases.getOne({ submeter: req.params.submeter, registry: req.params.registry });
    if (!registry) {
      res.status(404).send("Registry not found");
      return;
    }
    if (!registry.id) {
      res.status(404).send("Registry not found");
      return;
    }
    const meter = await meteringUseCases.getBySubmeterAndRegistryAndTimeInRange(
      req.params.submeter,
      registry.id,
      parseInt(req.params.start),
      parseInt(req.params.end),
      "day"
    );
    res.status(200).json(meter);
  });

  router.get(
    "/get-by-hour/:submeter/:registry/:start/:end",
    async (req, res) => {
      console.log(req.params);
      const registry = await registryUseCases.getOne({
        submeter: req.params.submeter,
        registry: req.params.registry,
      });
      if (!registry) {
        res.status(404).send("Registry not found");
        return;
      }
      if (!registry.id) {
        res.status(404).send("Registry not found");
        return;
      }
      const meter =
        await meteringUseCases.getBySubmeterAndRegistryAndTimeInRange(
          req.params.submeter,
          registry.id,
          parseInt(req.params.start),
          parseInt(req.params.end),
          "hour"
        );
      res.status(200).json(meter);
    }
  );

  router.get(
    "/get-by-minute/:submeter/:registry/:start/:end",
    async (req, res) => {
      console.log(req.params);
      const registry = await registryUseCases.getOne({
        submeter: req.params.submeter,
        registry: req.params.registry,
      });
      if (!registry) {
        res.status(404).send("Registry not found");
        return;
      }
      if (!registry.id) {
        res.status(404).send("Registry not found");
        return;
      }
      const meter =
        await meteringUseCases.getBySubmeterAndRegistryAndTimeInRange(
          req.params.submeter,
          registry.id,
          parseInt(req.params.start),
          parseInt(req.params.end),
          "minute"
        );
      res.status(200).json(meter);
    }
  );

  return router;
}
