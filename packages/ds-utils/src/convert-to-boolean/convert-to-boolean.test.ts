import { convertToBoolean } from './convert-to-boolean';

describe('This function will convert string 0 and 1 to corresponding boolean value', () => {
    it('should convert string "true" to boolean true', () => {
        const isResult = convertToBoolean('true');
        expect(isResult).toBe(true);
    });

    it('should convert string "false" to boolean false', () => {
        const isResult = convertToBoolean('false');
        expect(isResult).toBe(false);
    });
    it('should convert string "1" to boolean true', () => {
        const isResult = convertToBoolean('1');
        expect(isResult).toBe(true);
    });
    it('should convert string "0" to boolean false', () => {
        const isResult = convertToBoolean('0');
        expect(isResult).toBe(false);
    });

    it('should convert any other string to boolean based on truthiness', () => {
        const isNonEmptyResult = convertToBoolean('non-empty-string');
        const isFalsyResult = convertToBoolean('');

        expect(isNonEmptyResult).toBe(false);
        expect(isFalsyResult).toBe(false);
    });

    it('should convert number 1 to boolean true', () => {
        const isResult = convertToBoolean(1);
        expect(isResult).toBe(true);
    });

    it('should convert number 0 to boolean false', () => {
        const isResult = convertToBoolean(0);
        expect(isResult).toBe(false);
    });

    it('should convert any other number to boolean based on truthiness', () => {
        const isTruthyResult = convertToBoolean(42);
        const isFalsyResult = convertToBoolean(0);

        expect(isTruthyResult).toBe(true);
        expect(isFalsyResult).toBe(false);
    });
});
