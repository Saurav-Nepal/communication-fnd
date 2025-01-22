import { parseJSONString } from './parse-json-string';

describe('@slabs/ds-utils/parse-json-string', () => {
    it('should parse a valid JSON string and return the parsed object', () => {
        const validJSONString = '{"key": "value", "number": 42}';
        const parsedObject = parseJSONString(validJSONString);
        expect(parsedObject).toStrictEqual({ key: 'value', number: 42 });
    });

    it('should return null for an empty string', () => {
        const emptyString = '';
        expect(parseJSONString(emptyString)).toBe(null);
    });

    it('should return null for a non-JSON string', () => {
        // Patch Console error.
        const initialError = console.error;
        console.error = () => {};

        const nonJSONString = 'This is not a JSON string';
        expect(parseJSONString(nonJSONString)).toBe(null);

        console.error = initialError;
    });
});
