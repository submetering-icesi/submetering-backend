import { Measure } from "../../domain/entities/Measure";
import { ICommonUseCases } from "./common";

export interface IMeasurementUseCases extends ICommonUseCases<Measure> {
    getBySubmeter: (submeter: string) => Promise<Measure[]>;
    getByTimerange: (start: string, end: string) => Promise<Measure[]>;
    getBySubmeterAndTimerange: (submeter: string, start: string, end: string) => Promise<Measure[]>;
    getByTimeGreaterThan: (time: string) => Promise<Measure[]>;
    getByTimeLessThan: (time: string) => Promise<Measure[]>;
    getByType: (type: string) => Promise<Measure[]>;
}