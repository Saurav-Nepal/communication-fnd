import { isDateEqualIgnoringTime } from './is-date-equal-ignoring-time';

describe('@slabs/ds-utils/is-date-equal', () => {
    it('should return true for equal date and time', () => {
        const date1 = new Date('2022-01-01T12:00:00');
        const date2 = new Date('2022-01-01T12:00:00');
        expect(isDateEqualIgnoringTime(date1, date2)).toBe(true);
    });

    it('should return false for different dates', () => {
        const date1 = new Date('2022-01-01T12:00:00');
        const date2 = new Date('2022-01-02T18:30:45');
        expect(isDateEqualIgnoringTime(date1, date2)).toBe(false);
    });

    it('should return true for equal dates with different times', () => {
        const date1 = new Date('2022-01-01T12:00:00');
        const date2 = new Date('2022-01-01T18:30:45');
        expect(isDateEqualIgnoringTime(date1, date2)).toBe(true);
    });
});
