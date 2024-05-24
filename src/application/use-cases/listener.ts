export interface IListenerUseCases<T> {
    watch: (message: T) => void
}