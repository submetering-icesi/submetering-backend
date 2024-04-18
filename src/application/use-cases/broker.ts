export interface IBrokerUseCases {
    subscribe: (topic: string, callback: (message: any) => void) => void;
    publish: (topic: string, message: any) => void;
}