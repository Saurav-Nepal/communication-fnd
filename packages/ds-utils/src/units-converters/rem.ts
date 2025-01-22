/**
 * Creates a converter function that converts a value to a string with the specified units.
 *
 * @param {string} units - The units to be appended to the converted value.
 * @return {function} The converter function that accepts a value and returns a string with the specified units.
 */
function createConverter(units: string) {
    function converter(value: unknown): string {
        if (value === 0 || value === '0') {
            return '0';
        }

        if (typeof value === 'number') {
            const val = `${value / 16}${units}`;
            return val;
        }

        if (typeof value === 'string') {
            if (
                value.startsWith('calc(') ||
                value.startsWith('var(') ||
                value.startsWith('clamp(')
            ) {
                return value;
            }

            if (value.includes(' ')) {
                return value
                    .split(' ')
                    .map((val) => converter(val))
                    .join(' ');
            }

            if (value.includes(units)) {
                return value;
            }

            const replaced = value.replace('px', '');
            if (!Number.isNaN(Number(replaced))) {
                const val = `${Number(replaced) / 16}${units}`;
                return val;
            }
        }

        return value as string;
    }

    return converter;
}

export const rem = createConverter('rem');
export const em = createConverter('em');
