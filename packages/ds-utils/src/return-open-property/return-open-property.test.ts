import { ReturnOpenProperty } from './return-open-property';

describe('ReturnOpenProperty', () => {
    it('should return the value as it is if convertBoolean is not passed', () => {
        expect(ReturnOpenProperty('true')).toBe('true');
    });

    it('should return the value as boolean if convertBoolean is passed', () => {
        expect(ReturnOpenProperty('true', { convertBoolean: true })).toBe(true);
    });

    it('should return the value as boolean false if convertBoolean is passed as false', () => {
        expect(ReturnOpenProperty('false', { convertBoolean: true })).toBe(
            false
        );
    });

    it('should return the value as boolean if convertBoolean is passed and string of number is passed', () => {
        expect(ReturnOpenProperty('42', { convertBoolean: true })).toBe(true);
    });

    it('should return the value as boolean false if convertBoolean is passed and string of number 0 is passed', () => {
        expect(ReturnOpenProperty('0', { convertBoolean: true })).toBe(false);
    });

    it('should return the value as boolean false if convertBoolean is passed as number is passed as 0', () => {
        expect(ReturnOpenProperty(0, { convertBoolean: true })).toBe(false);
    });

    it('should return the value as boolean true if convertBoolean is passed as number 1 is passed', () => {
        expect(ReturnOpenProperty(1, { convertBoolean: true })).toBe(true);
    });

    it('should return the value as its if convertBoolean is passed as false', () => {
        expect(ReturnOpenProperty('42', { convertBoolean: false })).toBe('42');
    });
});
