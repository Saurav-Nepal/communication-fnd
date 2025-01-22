import { ObjectDto } from '../types';

/**
 * Transform any given object to label & value pair array.
 *
 * @param obj Object.
 * @param label Label Key
 * @param value Value Key
 * @returns `Label` `Value` pair array
 */
export const transformObjectToLabelValueObjectArray = <
    TObject extends ObjectDto,
    TLabel extends string = 'label',
    TValue extends string = 'value',
>(
    obj: TObject,
    label?: TLabel,
    value?: TValue
) => {
    return Object.keys(obj).map(
        (objKey) =>
            ({
                [label ?? 'label']: objKey,
                [value ?? 'value']: obj[objKey],
            }) as Record<TLabel | TValue, any>
    );
};
