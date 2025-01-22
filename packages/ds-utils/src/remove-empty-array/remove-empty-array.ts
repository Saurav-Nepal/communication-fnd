import { removeEmptyObjectKeys } from '../remove-empty-object-keys/remove-empty-object-keys';
import { ObjectDto } from '../types';

export function removeEmptyArray<TValue>(array: TValue[]): TValue[] {
    return array
        .filter((data) => {
            return (
                data != null &&
                !(typeof data === 'object' && Object.keys(data).length === 0)
            );
        })
        .map((data) => {
            if (typeof data === 'object') {
                const newData = removeEmptyObjectKeys(data as ObjectDto);
                return Object.keys(newData).length > 0 ? newData : undefined;
            }
            return data;
        })
        .filter(Boolean) as TValue[];
}
