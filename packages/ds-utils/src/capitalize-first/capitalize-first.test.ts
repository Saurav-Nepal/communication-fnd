import { capitalizeFirst } from './capitalize-first';

describe('capitalizeFirst', () => {
    it('should capitalize the string', () => {
        const inputString = 'hello world';
        const expectedResult = 'Hello world';

        const result = capitalizeFirst(inputString);

        expect(result).toEqual(expectedResult);
    });
    it('should handle empty string', () => {
        const inputString = '';
        const expectedResult = '';

        const result = capitalizeFirst(inputString);

        expect(result).toEqual(expectedResult);
    });

    it('should handle single character string', () => {
        const inputString = 'a';
        const expectedResult = 'A';

        const result = capitalizeFirst(inputString);

        expect(result).toEqual(expectedResult);
    });
});
