export function AutoBind(
    _: any,
    _Hook: string | symbol,
    descriptor: TypedPropertyDescriptor<any>
): any {
    return {
        enumerable: false,
        configurable: true,
        get() {
            return descriptor.value.bind(this);
        },
    };
}
