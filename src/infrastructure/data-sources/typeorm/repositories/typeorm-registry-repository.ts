import { DataSource, Repository } from "typeorm";
import { ICommonUseCases } from "../../../../application/use-cases/common";
import { Registry } from "../../../../domain/entities/Registry";
import { TypeORMRegistry } from "../models/Registry";

export class TypeORMRegistryRepository implements ICommonUseCases<Registry> {
    protected registryRepository: Repository<TypeORMRegistry>;

    constructor(dataSource: DataSource) {
        this.registryRepository = dataSource.getRepository(TypeORMRegistry);
    }

    protected getWhereCondition(filter: Partial<Registry>): Partial<Registry> {
        const whereCondition = {};

        Object.keys(filter).forEach(key => {
            const safeKey = key as keyof Registry;
            const value = filter[safeKey];

            if (value !== undefined && value !== null && safeKey !== 'submeter') {
                Object.assign(whereCondition, {[safeKey]: value});
            }

            if (safeKey === 'submeter') {
                Object.assign(whereCondition, { submeter: { id: value } });
            }
        });

        return whereCondition;
    }

    add(entity: Registry) : Promise<Registry> {
        return this.registryRepository.save(entity);
    }

    async update(filter: Partial<Registry>, entity: Registry) : Promise<Registry> {
        const whereCondition = this.getWhereCondition(filter);
        const registry = await this.registryRepository.findOne({ where: whereCondition })
        return this.registryRepository.save({ id: registry?.id, ...entity })
    }

    delete(filter: Partial<Registry>) : any {
        const whereCondition = this.getWhereCondition(filter);
        this.registryRepository.delete(whereCondition)
    }

    getOne(filter: Partial<Registry>) : Promise<Registry | null> {
        const whereCondition = this.getWhereCondition(filter);
        console.log(whereCondition);
        return this.registryRepository.findOne({ where: whereCondition });
    }

    getAll() : Promise<Registry[]> {
        return this.registryRepository.find();
    }
    getAllByFilter(filter: Partial<Registry>): Promise<Registry[]> {
        const whereCondition = this.getWhereCondition(filter);
        return this.registryRepository.find({ where: whereCondition });
    }
}