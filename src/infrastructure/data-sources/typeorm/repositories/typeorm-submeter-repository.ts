import { DataSource, Repository } from "typeorm";
import { ICommonUseCases } from "../../../../application/use-cases/common";
import { Submeter } from "../../../../domain/entities/Submeter";
import { TypeORMSubmeter } from "../models/Submeter";

export class TypeORMSubmeterRepository implements ICommonUseCases<Submeter> {
    protected submeterRepository: Repository<TypeORMSubmeter>;

    constructor(dataSource: DataSource) {
        this.submeterRepository = dataSource.getRepository(TypeORMSubmeter);
    }

    protected getWhereCondition(filter: Partial<Submeter>) : Partial<Submeter> {
        const whereCondition: Partial<Submeter> = {};

        Object.keys(filter).forEach(key => {
            const safeKey = key as keyof Submeter;
            if (filter[safeKey] !== undefined && filter[safeKey] !== null) {
                whereCondition[safeKey] = filter[safeKey];
            }
        });

        return whereCondition;
    }

    add(entity: Submeter) : Promise<Submeter> {
        return this.submeterRepository.save(entity);
    }

    async update(filter: Partial<Submeter>, entity: Submeter) : Promise<Submeter> {
        const whereCondition = this.getWhereCondition(filter);
        const submeter = await this.submeterRepository.findOne({ where: whereCondition });
        return this.submeterRepository.save({ id: submeter?.id, ...entity })
    }

    delete(filter: Partial<Submeter>) : any {
        const whereCondition = this.getWhereCondition(filter);
        this.submeterRepository.delete(whereCondition)
    }

    getOne(filter: Partial<Submeter>) : Promise<Submeter | null> {
        const whereCondition = this.getWhereCondition(filter);
        return this.submeterRepository.findOne({ where: whereCondition });
    }

    getAll() : Promise<Submeter[]> {
        return this.submeterRepository.find();
    }

    getAllByFilter(filter: Partial<Submeter>) : Promise<Submeter[]> {
        const whereCondition = this.getWhereCondition(filter);
        return this.submeterRepository.find({ where: whereCondition });
    }
}