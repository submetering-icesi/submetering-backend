import { Measure } from "../../domain/entities/Measure";
import { MeteringUnit } from "../../domain/types/report";
import { ICommonUseCases } from "./common";

export interface IMeasurementUseCases extends ICommonUseCases<Measure> {
    getBySubmeter: (submeter: string) => Promise<Measure[]>;
    getByTimerange: (start: number, end: number) => Promise<Measure[]>;
    getBySubmeterAndTimerange: (submeter: string, start: number, end: number) => Promise<Measure[]>;
    getByTimeGreaterThan: (time: number) => Promise<Measure[]>;
    getByTimeLessThan: (time: number) => Promise<Measure[]>;
    getBySubmeterAndRegistryAndTimeInRange: (submeter: string, registry: string, start: number, end: number, range: 'day' | 'hour' | 'minute') => Promise<MeteringUnit[]>;
}