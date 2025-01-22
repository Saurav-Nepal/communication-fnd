import { isWindow } from './is-window';

describe('IsWindow function', () => {
    it('should return true if window object is available', () => {
        expect(isWindow()).toBe(true);
    });

    it('should return false if window object is not available', () => {
        // @ts-ignore
        delete global.window;

        expect(isWindow()).toBe(false);
    });
});
