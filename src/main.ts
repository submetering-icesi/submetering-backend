import dotenv from 'dotenv';
import cors from 'cors';
import server from './server';
import "reflect-metadata";
import { TypeORMDataSource } from './infrastructure/data-sources/typeorm';
import SubmeterRouter from './presentation/routers/submeter-router';
import BrokerRouter, { BrokerInitWatch } from './presentation/routers/broker-router';
import { MqttBroker } from './infrastructure/brokers/mqtt';
import { MeteringListener } from './infrastructure/submeters/lovato';
import RegistryRouter from './presentation/routers/registry-router';
import TopicRouter from './presentation/routers/topic-router';
import { errorHandler } from './presentation/middlewares/error-handler';
import MeterRouter from './presentation/routers/meter-router';
import { Request } from 'express';

dotenv.config();

(async () => {
    server.use(cors<Request>())
    const dataSource = new TypeORMDataSource();
    await dataSource.initialize();
    const broker = new MqttBroker();
    const meteringListener = new MeteringListener(dataSource.measures, dataSource.registries, dataSource.submeters);
    const submeterMiddleware = SubmeterRouter(dataSource.submeters);
    const brokerMiddleware = BrokerRouter(broker, meteringListener, dataSource.topics);
    const registryMiddleware = RegistryRouter(dataSource.registries, dataSource.submeters);
    const topicMiddleware = TopicRouter(dataSource.topics);
    const measureMiddleware = MeterRouter(dataSource.measures, dataSource.registries);
    server.use('/submeter', submeterMiddleware);
    server.use('/broker', brokerMiddleware);
    server.use('/registry', registryMiddleware);
    server.use('/topic', topicMiddleware);
    server.use('/measure', measureMiddleware);
    server.listen(process.env.PORT, () => {
        console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
    server.use(errorHandler);
    setTimeout(() => {
        BrokerInitWatch(broker, dataSource.topics, meteringListener);
    }, 3000)
})()