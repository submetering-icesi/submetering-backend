export interface Measure {
    id?: string;
    type: string;
    value: number;
    unit: string;
    timestamp: number;
    submeter: string;
    registry: string;
}