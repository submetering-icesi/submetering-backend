import { DataSource, Repository } from "typeorm";
import { ICommonUseCases } from "../../../../application/use-cases/common";
import { Submeter } from "../../../../domain/entities/Submeter";
import { TypeORMSubmeter } from "../models/Submeter";

export class TypeORMSubmeterRepository implements ICommonUseCases<Submeter> {
    protected submeterRepository: Repository<TypeORMSubmeter>;

    constructor(dataSource: DataSource) {
        this.submeterRepository = dataSource.getRepository(TypeORMSubmeter);
    }

    add(entity: Submeter) : Promise<Submeter> {
        return this.submeterRepository.save(entity);
    }
    update(id: string, entity: Submeter) : Promise<Submeter> {
        return this.submeterRepository.save({ ...entity, id });
    }
    delete(id: string) : any {
        this.submeterRepository.delete(id)
    }
    getById(id: string) : Promise<Submeter | null> {
        return this.submeterRepository.findOne({ where: { id } });
    }
    getAll() : Promise<Submeter[]> {
        return this.submeterRepository.find();
    }
}