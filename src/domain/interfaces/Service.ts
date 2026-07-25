interface Service<T> {
    execute(params: any): Promise<T | null>;
}

export { Service };