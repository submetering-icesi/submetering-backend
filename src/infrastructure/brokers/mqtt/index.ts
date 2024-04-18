import * as mqtt from 'mqtt';
import { IBrokerUseCases } from '../../../application/use-cases/broker';

export class MqttBroker implements IBrokerUseCases {
    protected client: any;

    constructor(){
        this.client = mqtt.connect(process.env.MQTT_URL || 'mqtt://localhost');
        this.client.on('connect', () => {
            console.log('Conexión exitosa');
        });
    }

    subscribe(topic: string, callback: (message: any) => void) : void {
        this.client.subscribe(topic, (err: any) => {
            if (!err) {
            console.log('Suscripción exitosa');
            } else {
            console.log('Error en la suscripción', err);
            }
        });
        this.client.on('message', (topic: string, message: any) => {
            callback({...JSON.parse(message.toString()), topic});
        });
    }
    publish(topic: string, message: any) : void {
        this.client.publish(topic, JSON.stringify(message), (err: any) => {
            if (!err) {
            console.log('Publicación exitosa');
            } else {
            console.log('Error en la publicación', err);
            }
        });
    }
}