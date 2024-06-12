import { Between, DataSource, Equal, Repository } from "typeorm";
import { IMeasurementUseCases } from "../../../../application/use-cases/measurement";
import { Measure } from "../../../../domain/entities/Measure";
import { TypeORMMeasure } from "../models/Measure";
import { MeteringUnit } from "../../../../domain/types/report";

export class TypeORMMeasureRepository implements IMeasurementUseCases {
  protected measureRepository: Repository<TypeORMMeasure>;

  constructor(dataSource: DataSource) {
    this.measureRepository = dataSource.getRepository(TypeORMMeasure);
  }

  protected getWhereCondition(filter: Partial<Measure>): Partial<Measure> {
    const whereCondition: Partial<Measure> = {};

    Object.keys(filter).forEach((key) => {
      const safeKey = key as keyof Measure;
      const value = filter[safeKey];

      if (value !== undefined && value !== null) {
        Object.assign(whereCondition, { [safeKey]: value });
      }
    });

    return whereCondition;
  }

  add(entity: Measure): Promise<Measure> {
    return this.measureRepository.save(entity);
  }
  async update(filter: Partial<Measure>, entity: Measure): Promise<Measure> {
    const whereCondition = this.getWhereCondition(filter);
    const measure = await this.measureRepository.findOne({
      where: whereCondition,
    });
    return this.measureRepository.save({ id: measure?.id, ...entity });
  }
  delete(filter: Partial<Measure>): any {
    const whereCondition = this.getWhereCondition(filter);
    this.measureRepository.delete(whereCondition);
  }
  getOne(filter: Partial<Measure>): Promise<Measure | null> {
    const whereCondition = this.getWhereCondition(filter);
    return this.measureRepository.findOne({ where: whereCondition });
  }
  getAll(): Promise<Measure[]> {
    return this.measureRepository.find();
  }
  getBySubmeter(submeter: string): Promise<Measure[]> {
    return this.measureRepository.find({ where: { submeter } });
  }
  async getByTimerange(start: number, end: number): Promise<Measure[]> {
    const measures = await this.measureRepository.find();
    return measures.filter(
      (measure) => measure.timestamp >= start && measure.timestamp <= end
    );
  }
  async getBySubmeterAndTimerange(
    submeter: string,
    start: number,
    end: number
  ): Promise<Measure[]> {
    const measures = await this.measureRepository.find({ where: { submeter } });
    return measures.filter(
      (measure) => measure.timestamp >= start && measure.timestamp <= end
    );
  }
  async getByTimeGreaterThan(time: number): Promise<Measure[]> {
    const measures = await this.measureRepository.find();
    return measures.filter((measure) => measure.timestamp > time);
  }
  async getByTimeLessThan(time: number): Promise<Measure[]> {
    const measures = await this.measureRepository.find();
    return measures.filter((measure) => measure.timestamp < time);
  }
  async getBySubmeterAndRegistryAndTimeInRange(
    submeter: string,
    registry: string,
    start: number,
    end: number,
    range: "day" | "hour" | "minute"
  ): Promise<MeteringUnit[]> {
    const filteredData = await this.measureRepository.find({
      where: {
        submeter: Equal(submeter),
        registry: Equal(registry),
        timestamp: Between(start, end),
      },
    });

    let timerange: number;

    if (range === "day") {
      timerange = 86400;
    } else if (range === "hour") {
      timerange = 3600;
    } else {
      timerange = 60;
    }

    const meteringUnits: MeteringUnit[] = [];
    const groups = (end - start) / timerange;
    for (let i = 0; i < groups; i++) {
      const timestamp = start + i * timerange;
      const measures = filteredData.filter(
        (measure) =>
          measure.timestamp >= timestamp &&
          measure.timestamp < timestamp + timerange
      );
      if (measures.length === 0) {
        continue;
      }
      const sum = measures.reduce(
        (acc: number, measure: TypeORMMeasure) =>
          Number(acc) + Number(measure.value),
        0
      );
      meteringUnits.push({
        time: timestamp,
        value: sum / measures.length,
      });
    }

    return meteringUnits;
  }

  async getAllByFilter(filter: Partial<Measure>) : Promise<Measure[]> {
    const whereCondition = this.getWhereCondition(filter);
    return this.measureRepository.find({ where: whereCondition });
  }
}
