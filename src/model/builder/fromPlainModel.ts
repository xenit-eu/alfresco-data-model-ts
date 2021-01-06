import invariant from 'tiny-invariant';

function ucfirst<T extends string>(s: T): Uppercase<T> {
    return (s[0].toUpperCase() + s.slice(1)) as any;
}

interface BuilderObject<T> {
    build(): T;
}

type ModelFromBuilder<Builder> = Builder extends BuilderObject<infer M>
    ? M
    : never;

export type PlainModelFromBuilder<Builder> = {
    [k in keyof Builder as StripWith<k>]?: Builder[k] extends Function
        ? FirstParameter<Builder[k]>
        : never;
};

type StripWith<K> = K extends `with${infer R}` ? Uncapitalize<R> : never;
type FirstParameter<F extends Function> = F extends (a: infer A) => any
    ? A
    : never;

export default function fromPlainModel<Builder extends BuilderObject<any>>(
    builder: Builder,
    plainModel: PlainModelFromBuilder<Builder>
): ModelFromBuilder<Builder> {
    for (const modelKey of Object.keys(plainModel) as Array<
        keyof typeof plainModel
    >) {
        const modelValue = plainModel[modelKey];
        const methodName = ('with' +
            ucfirst(modelKey as string)) as keyof Builder;
        invariant(
            builder[methodName] instanceof Function,
            methodName + ' is not a method of the builder'
        );
        ((builder[methodName] as unknown) as Function)(modelValue);
    }

    return builder.build();
}
