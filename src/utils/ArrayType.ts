export type ArrayType<T> = T extends Array<infer U> ? U : T;
