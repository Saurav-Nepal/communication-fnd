/**
 * converts a string or number to a boolean string{0,1,true,false} or number{0,1,42}
 * @param  {string | number} value
 */
export function convertToBoolean(value: string | number) {
    if (value === 'true') {
        return true;
    }
    if (value === 'false') {
        return false;
    }
    return !!+value;
}
