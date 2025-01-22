import { aerialDistance } from './get-arial-distance';

describe('This Function will calculate Arial Distance', () => {
    it('should return 0 if both the points are same', () => {
        const result = aerialDistance(1, 1, 1, 1);
        expect(result).toBe(0);
    });

    it('should return distance in KM if unit is K', () => {
        const result = aerialDistance(1, 1, 2, 2, 'K');
        expect(result).toBe(157.2178677858709);
    });

    it('should return distance in Nautical Miles if unit is N', () => {
        const result = aerialDistance(1, 1, 2, 2, 'N');
        expect(result).toBe(84.83456388767739);
    });
    it('should calculate distance between two points in kilometers', () => {
        const lat1 = 37.7749;
        const lon1 = -122.4194;
        const lat2 = 34.0522;
        const lon2 = -118.2437;

        const result = aerialDistance(lat1, lon1, lat2, lon2, 'K');

        expect(result).toBeCloseTo(559.0936772846585, 2);
    });

    it('should calculate distance between two points in nautical miles', () => {
        const lat1 = 37.7749;
        const lon1 = -122.4194;
        const lat2 = 34.0522;
        const lon2 = -118.2437;

        const result = aerialDistance(lat1, lon1, lat2, lon2, 'N');

        // Assert the result with an expected value (this value may need adjustment based on actual data)
        expect(result).toBeCloseTo(301.68624567152665, 2);
    });

    it('should return 0 if the coordinates are the same', () => {
        const lat = 37.7749;
        const lon = -122.4194;

        const result = aerialDistance(lat, lon, lat, lon);

        expect(result).toBe(0);
    });
});
