import { isValidEmailFormat } from './is-valid-email-format';

describe('@slabs/ds-utils/is-valid-email-format', () => {
    it('should return true for a valid email format', () => {
        expect(isValidEmailFormat('test@example.com')).toBe(true);
    });

    it('should return true for a valid email format with subdomains', () => {
        expect(isValidEmailFormat('user.name@subdomain.example.co.uk')).toBe(
            true
        );
    });
    it('should return false for an invalid email format', () => {
        expect(isValidEmailFormat('invalid-email')).toBe(false);
    });

    it('should return false for an empty email string', () => {
        expect(isValidEmailFormat('')).toBe(false);
    });

    it('should return false for a whitespace-only email string', () => {
        expect(isValidEmailFormat('   ')).toBe(false);
    });
});
