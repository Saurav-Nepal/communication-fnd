import { capitalize } from './capitalize';

describe('capitalize', () => {
    it('should capitalize the string', () => {
        const inputString = 'hello world';
        const expectedResult = 'Hello World';

        const result = capitalize(inputString);

        expect(result).toEqual(expectedResult);
    });

    it('should handle empty string', () => {
        const inputString = '';
        const expectedResult = '';

        const result = capitalize(inputString);

        expect(result).toEqual(expectedResult);
    });

    it('should hanndle single character string', () => {
        const inputString = 'a';
        const expectedResult = 'A';

        const result = capitalize(inputString);

        expect(result).toEqual(expectedResult);
    });

    it('should handle string with only spaces', () => {
        const inputString = '   ';
        const expectedResult = '   ';

        const result = capitalize(inputString);

        expect(result).toEqual(expectedResult);
    });

    it('should handle string with only special characters', () => {
        const inputString = '***';
        const expectedResult = '***';

        const result = capitalize(inputString);

        expect(result).toEqual(expectedResult);
    });

    it('should handle string with only numbers', () => {
        const inputString = '123';
        const expectedResult = '123';

        const result = capitalize(inputString);

        expect(result).toEqual(expectedResult);
    });

    it('should handle string with only special characters and numbers', () => {
        const inputString = '123***';
        const expectedResult = '123***';

        const result = capitalize(inputString);

        expect(result).toEqual(expectedResult);
    });

    it('should handle string with only special characters and spaces', () => {
        const inputString = '   ***';
        const expectedResult = '   ***';

        const result = capitalize(inputString);

        expect(result).toEqual(expectedResult);
    });
});
