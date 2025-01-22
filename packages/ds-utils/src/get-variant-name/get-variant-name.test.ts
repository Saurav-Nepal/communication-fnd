import { getVariantName } from './get-variant-name';

describe('getVariantName function', () => {
    it('should concatenate quantity and unit name into a string', () => {
        const quantity = 5;
        const unit = { name: 'items' };

        const result = getVariantName(quantity, unit);

        expect(result).toBe('5 items');
    });
    it('when  unit is not provided', () => {
        const unit = { name: '' };

        const result = getVariantName(5, unit);

        expect(result).toBe('5 ');
    });
});
