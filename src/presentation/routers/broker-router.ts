import { Router } from "express";
import { IBrokerUseCases } from "../../application/use-cases/broker";
import { IListenerUseCases } from "../../application/use-cases/listener";
import { BrokerMessage } from "../../domain/types/message";
import { ICommonUseCases } from "../../application/use-cases/common";
import { Topic } from "../../domain/entities/Topic";

export default function BrokerRouter(brokerUseCases: IBrokerUseCases, listenerUseCases: IListenerUseCases<BrokerMessage>, topicUseCases: ICommonUseCases<Topic>) {
    const router = Router();

    router.post('/publish', (req, res) => {
        const { topic, message } = req.body;
        brokerUseCases.publish(topic, message);
        res.status(200).send();
    });

    router.post('/subscribe', (req, res) => {
        const { name, topic } = req.body;
        topicUseCases.add({ name, topic });
        brokerUseCases.subscribe(topic, (message: BrokerMessage) => {
            console.log('Mensaje recibido:', message)
            listenerUseCases.watch(message);
        });
        res.status(200).send();
    });
    return router;
}

export function BrokerInitWatch(brokerUseCases: IBrokerUseCases, topicUseCases: ICommonUseCases<Topic>, listenerUseCases: IListenerUseCases<BrokerMessage>) {
    topicUseCases.getAll().then((topics) => {
        topics.forEach((topic) => {
            brokerUseCases.subscribe(topic.topic, (message: BrokerMessage) => {
                console.log('Mensaje recibido:', message)
                listenerUseCases.watch(message);
            });
        });
        brokerUseCases.publish('server-submetering', { action: 'register' });
    });
}