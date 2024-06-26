// Method Decorator
export function Restricted() {
    return function (
        target: Object,
        key: string | symbol,
        descriptor: PropertyDescriptor
    ) {
        const original = descriptor.value;

        descriptor.value = function (...args: any[]) {
            const result = original.apply(this, args);
            return result;
        };
        return descriptor;
    };
}
