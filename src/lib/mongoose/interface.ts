interface RepositoryShape<T> {
    create(param: T): Promise<T | null>;
    update(id: string, param: Partial<T>): Promise<T | null>;
    get(pipeline: any[]): Promise<T | null>;
    delete(id: string): Promise<boolean>;
    search(pipeline: any[]): Promise<T[] | []>
}

export { RepositoryShape }