import Values from 'values.js';

export const hexToHSL = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    let r = parseInt(result[1], 16);
    let g = parseInt(result[2], 16);
    let b = parseInt(result[3], 16);
    (r /= 255), (g /= 255), (b /= 255);
    const max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    let h: number,
        s: number,
        l = (max + min) / 2;
    if (max == min) {
        h = s = 0;
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
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    const HSL = {
        h: '0',
        s: '0',
        l: '0',
    };
    HSL['h'] = (h * 360).toFixed(2);
    HSL['s'] = (s * 100).toFixed(2);
    HSL['l'] = (l * 100).toFixed(2);
    return HSL;
};

export const getColorShades = (
    color: string,
    results: number = 6,
    options?: { maxIntensity?: number; minIntensity?: number }
) => {
    const { maxIntensity = 100, minIntensity = 100 } = options || {};

    const tint = Array.from({ length: Math.ceil(results / 2) })
        .map((_, index, arrays) => {
            return new Values(color)
                .tint((index / arrays.length) * minIntensity)
                .rgbString();
        })
        .reverse();
    const shades = Array.from({ length: Math.floor(results / 2) }).map(
        (_, index, arrays) => {
            return new Values(color)
                .shade(((index + 1) / arrays.length) * maxIntensity)
                .rgbString();
        }
    );
    return [...tint, ...shades];
};

export const getCardColorShades = (color: string) => {
    const brightness = new Values(color).getBrightness();
    const alternativeColor =
        brightness > 40
            ? new Values(color).shade(70).rgbString()
            : new Values(color).tint(70).rgbString();

    return [color, alternativeColor];
};

/**
 *  Random color generator
 * @param baseColor - base color to generate random color (lightness and saturation will be same as base color)
 * @returns - random color in hsl format
 */

export const randomColorGenerator = (baseColor: string) => {
    const hsl = hexToHSL(baseColor);
    const randomHue = Math.floor(Math.random() * 360);
    const saturation = hsl['s'];
    const lightness = hsl['l'];
    return `hsl(${randomHue}deg ${saturation}% ${lightness}%)`;
};
