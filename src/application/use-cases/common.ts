export interface ICommonUseCases<T> {
    add: (entity: T) => Promise<T>;
    update: (id: string, entity: T) => Promise<T>;
    delete: (id: string) => any;
    getById: (id: string) => Promise<T | null>;
    getAll: () => Promise<T[]>;
}