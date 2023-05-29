export type ValueOf<T> = T[keyof T]

export type DeepReadonly<T> = {
  readonly [P in keyof T]: T[P] extends Record<string, unknown>
    ? DeepReadonly<T[P]>
    : T[P];
};

export type Arguments<T extends (args: any) => any> = T extends (args: infer A) => any ? A : never;

export type PickMatching<T, V> =
    { [K in keyof T as T[K] extends V ? K : never]: T[K] }

export type ExtractMethods<T> = PickMatching<T, Function>;

export type Unpacked<T> = T extends (infer U)[] ? U : T;
