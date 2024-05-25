import { ICommonUseCases } from "../../../application/use-cases/common";
import { IListenerUseCases } from "../../../application/use-cases/listener";
import { IMeasurementUseCases } from "../../../application/use-cases/measurement";
import { Measure } from "../../../domain/entities/Measure";
import { Registry } from "../../../domain/entities/Registry";
import { Submeter } from "../../../domain/entities/Submeter";
import { BrokerMessage, BrokerMessageMetering } from "../../../domain/types/message";

export class MeteringListener implements IListenerUseCases<BrokerMessageMetering> {
    private measureRepository: IMeasurementUseCases;
    private registerRepository: ICommonUseCases<Registry>;
    private submeterRepository: ICommonUseCases<Submeter>;

    constructor(measureRepository: IMeasurementUseCases, registerRepository: ICommonUseCases<Registry>, submeterRepository: ICommonUseCases<Submeter>) {
        this.measureRepository = measureRepository;
        this.registerRepository = registerRepository;
        this.submeterRepository = submeterRepository;
    }

    protected convertRegistersToFloat32(registers: number[]) {
        const floatValue = registers[1]
        return floatValue;
    }

    watch(message: BrokerMessage): void {
        switch (message.type) {
            case 'register':
                this.submeterRepository.getOne({ name: message.name }).then((submeter) => {
                    if (!submeter) {
                        this.submeterRepository.add({ name: message.name, location: message.name })
                    }
                })
                break;

            case 'metering':
                this.submeterRepository.getOne({ name: message.submeter }).then((submeter) => {
                    if (!submeter) {
                        console.log(`Submeter ${message.submeter} not found`);
                        return;
                    }
                    this.registerRepository.getOne({ submeter: submeter.id, registry: message.registry }).then((registry) => {
                        if (!registry) {
                            console.log(`Registry ${message.registry} not found for submeter ${submeter.name}`);
                            return;
                        }
                        const measure: Measure = {
                            submeter: submeter?.id || "",
                            timestamp: message.timestamp,
                            registry: registry.id || "",
                            value: this.convertRegistersToFloat32(message.value)/registry.format
                        }
                        this.measureRepository.add(measure);
                    })
                });
                break;
        
            default:
                throw new Error("Cannot get message type");
                break;
        }
    }
}