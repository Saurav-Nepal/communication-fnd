import { convertToBoolean } from '../convert-to-boolean/convert-to-boolean';

export function ReturnOpenProperty(
    value: string | number,
    options?: { convertBoolean?: boolean }
) {
    if (options?.convertBoolean) {
        // open property values are by default string in nature, to convert them to boolean convertBoolean should be true
        return convertToBoolean(value);
    }

    return value;
}
