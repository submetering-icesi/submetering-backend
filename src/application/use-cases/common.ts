export interface ICommonUseCases<T> {
    add: (entity: T) => Promise<T>;
    update: (filter: Partial<T>, entity: T) => Promise<T>;
    delete: (filter: Partial<T>) => any;
    getOne: (filter: Partial<T>) => Promise<T | null>;
    getAll: () => Promise<T[]>;
}