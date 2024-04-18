import dotenv from 'dotenv';
import server from './server';
import "reflect-metadata";
import { TypeORMDataSource } from './infrastructure/data-sources/typeorm';
import SubmeterRouter from './presentation/routers/submeter-router';
import BrokerRouter from './presentation/routers/broker-router';
import { MqttBroker } from './infrastructure/brokers/mqtt';

dotenv.config();

(async () => {
    const dataSource = new TypeORMDataSource();
    dataSource.initialize();
    const broker = new MqttBroker();
    const submeterMiddleware = SubmeterRouter(dataSource.submeters);
    const brokerMiddleware = BrokerRouter(broker);
    server.use('/submeter', submeterMiddleware);
    server.use('/broker', brokerMiddleware);
    server.listen(process.env.PORT, () => {
        console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
})()