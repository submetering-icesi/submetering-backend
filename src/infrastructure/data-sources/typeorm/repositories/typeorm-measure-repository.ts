import { DataSource, Repository } from "typeorm";
import { IMeasurementUseCases } from "../../../../application/use-cases/measurement";
import { Measure } from "../../../../domain/entities/Measure";
import { TypeORMMeasure } from "../models/Measure";

export class TypeORMMeasureRepository implements IMeasurementUseCases {
    protected measureRepository: Repository<TypeORMMeasure>;

    constructor(dataSource: DataSource) {
        this.measureRepository = dataSource.getRepository(TypeORMMeasure);
    }

    add(entity: Measure) : Promise<Measure> {
        return this.measureRepository.save(entity);
    }
    update(id: string, entity: Measure) : Promise<Measure> {
        return this.measureRepository.save({ ...entity, id });
    }
    delete(id: string) : any {
        this.measureRepository.delete(id)
    }
    getById(id: string) : Promise<Measure | null> {
        return this.measureRepository.findOne({ where: { id } });
    }
    getAll() : Promise<Measure[]> {
        return this.measureRepository.find();
    }
    getBySubmeter(submeter: string) : Promise<Measure[]> {
        return this.measureRepository.find({ where: { submeter } });
    }
    async getByTimerange(start: string, end: string) : Promise<Measure[]> {
        const measures = await this.measureRepository.find();
        return measures.filter(measure => measure.timestamp >= start && measure.timestamp <= end);
    }
    async getBySubmeterAndTimerange(submeter: string, start: string, end: string) : Promise<Measure[]> {
        const measures = await this.measureRepository.find({ where: { submeter } });
        return measures.filter(measure => measure.timestamp >= start && measure.timestamp <= end);
    }
    async getByTimeGreaterThan(time: string) : Promise<Measure[]> {
        const measures = await this.measureRepository.find();
        return measures.filter(measure => measure.timestamp > time);
    }
    async getByTimeLessThan(time: string) : Promise<Measure[]> {
        const measures = await this.measureRepository.find();
        return measures.filter(measure => measure.timestamp < time);
    }
    getByType(type: string) : Promise<Measure[]> {
        return this.measureRepository.find({ where: { type } });
    }
}