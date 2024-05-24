import { Measure } from "../../domain/entities/Measure";
import { ICommonUseCases } from "./common";

export interface IMeasurementUseCases extends ICommonUseCases<Measure> {
    getBySubmeter: (submeter: string) => Promise<Measure[]>;
    getByTimerange: (start: number, end: number) => Promise<Measure[]>;
    getBySubmeterAndTimerange: (submeter: string, start: number, end: number) => Promise<Measure[]>;
    getByTimeGreaterThan: (time: number) => Promise<Measure[]>;
    getByTimeLessThan: (time: number) => Promise<Measure[]>;
    getByType: (type: string) => Promise<Measure[]>;
}