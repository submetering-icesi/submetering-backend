import { DataSource, Repository } from "typeorm";
import { ICommonUseCases } from "../../../../application/use-cases/common";
import { Topic } from "../../../../domain/entities/Topic";
import { TypeORMTopic } from "../models/Topic";

export class TypeORMTopicRepository implements ICommonUseCases<Topic> {
  protected topicRepository: Repository<TypeORMTopic>;

  constructor(dataSource: DataSource) {
    this.topicRepository = dataSource.getRepository(TypeORMTopic);
  }

  protected getWhereCondition(filter: Partial<Topic>): Partial<Topic> {
    const whereCondition: Partial<Topic> = {};

    Object.keys(filter).forEach((key) => {
      const safeKey = key as keyof Topic;
      const value = filter[safeKey];

      if (value !== undefined && value !== null) {
        Object.assign(whereCondition, { [safeKey]: value });
      }
    });

    return whereCondition;
  }

  add(entity: Topic): Promise<Topic> {
    return this.topicRepository.save(entity);
  }

  async update(filter: Partial<Topic>, entity: Topic): Promise<Topic> {
    const whereCondition = this.getWhereCondition(filter);
    const topic = await this.topicRepository.findOne({ where: whereCondition });
    return this.topicRepository.save({ id: topic?.id, ...entity });
  }

  delete(filter: Partial<Topic>): any {
    const whereCondition = this.getWhereCondition(filter);
    this.topicRepository.delete(whereCondition);
  }

  getOne(filter: Partial<Topic>): Promise<Topic | null> {
    const whereCondition = this.getWhereCondition(filter);
    return this.topicRepository.findOne({ where: whereCondition });
  }

  getAll(): Promise<Topic[]> {
    return this.topicRepository.find();
  }

  getAllByFilter(filter: Partial<Topic>): Promise<Topic[]> {
    const whereCondition = this.getWhereCondition(filter);
    return this.topicRepository.find({ where: whereCondition });
  }
}
