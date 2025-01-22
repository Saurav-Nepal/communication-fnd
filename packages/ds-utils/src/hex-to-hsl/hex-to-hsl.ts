/**
 * Converts a hexadecimal color code to HSL (Hue, Saturation, Lightness) values.
 *
 * @param {string} hex - The hexadecimal color code to convert.
 * @return {number[]} An array containing the HSL values [Hue, Saturation, Lightness].
 */
export function hexToHsl(hex: string) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return [];

    let r = parseInt(result?.[1] ?? 'ff', 16);
    let g = parseInt(result?.[2] ?? 'ff', 16);
    let b = parseInt(result?.[3] ?? 'ff', 16);

    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h,
        s,
        l = (max + min) / 2;

    if (max == min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            default:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }

    s = s * 100;
    s = Math.round(s);
    l = l * 100;
    l = Math.round(l);
    h = Math.round(360 * h);

    return [h, s, l];
}

/**
 * Converts a hex color code to an HSL string representation.
 *
 * @param {string} hex - The hex color code to convert.
 * @return {string | null} The HSL string representation of the hex color code, or null if the conversion failed.
 */
export function hexToHslString(hex: string) {
    const hsl = hexToHsl(hex);
    if (hsl.length < 3) return undefined;
    return `${hsl[0]} ${hsl[1]}% ${hsl[2]}%`;
}
