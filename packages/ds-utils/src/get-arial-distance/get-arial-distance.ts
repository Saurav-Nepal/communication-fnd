/**
 *@description This function returns the distance between two points in the given unit
 *
 * @param lat1 : Latitude of first point
 * @param lon1 : Longitude of first point
 * @param lat2 : Latitude of second point
 * @param lon2 : Longitude of second point
 * @param unit : Unit of distance K for Kilometer and N for Nautical Miles
 * @returns {number} : Returns the distance between two points in the given unit
 */

const NORMAL_CONVERSION_FACTOR = 1.1515;
const KILOMETER_CONVERSION_FACTOR = 1.609344;
const NAUTICAL_MILE_CONVERSION_FACTOR = 0.8684;

export function aerialDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
    unit: 'K' | 'N' = 'K'
): number {
    if (lat1 === lat2 && lon1 === lon2) {
        return 0;
    } else {
        const radLat1 = (Math.PI * lat1) / 180;
        const radLat2 = (Math.PI * lat2) / 180;
        const theta = lon1 - lon2;
        const radTheta = (Math.PI * theta) / 180;
        let dist =
            Math.sin(radLat1) * Math.sin(radLat2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = (dist * 180) / Math.PI;
        dist = dist * 60 * NORMAL_CONVERSION_FACTOR;
        if (unit === 'K') {
            dist = dist * KILOMETER_CONVERSION_FACTOR;
        }
        if (unit === 'N') {
            dist = dist * NAUTICAL_MILE_CONVERSION_FACTOR;
        }
        return dist;
    }
}
