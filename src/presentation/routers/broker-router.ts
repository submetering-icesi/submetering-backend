import { Router } from "express";
import { IBrokerUseCases } from "../../application/use-cases/broker";

export default function BrokerRouter(brokerUseCases: IBrokerUseCases) {
    const router = Router();

    router.post('/publish', (req, res) => {
        const { topic, message } = req.body;
        brokerUseCases.publish(topic, message);
        res.status(200).send();
    });

    router.post('/subscribe', (req, res) => {
        const { topic } = req.body;
        brokerUseCases.subscribe(topic, (message: any) => {
            console.log('Mensaje recibido:', message);
        });
        res.status(200).send();
    });
    return router;
}