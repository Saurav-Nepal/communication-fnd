import { CSSVariables } from '../../../types/css.types';
import { cssVariablesObjectToString } from './css-variables-object-to-string';
import { wrapWithSelector } from './wrap-with-selector';

export interface ConvertCSSVariablesInput {
    /** CSS variables available only in dark color scheme */
    dark: CSSVariables;

    /** CSS variables available only in light color scheme */
    light: CSSVariables;
}

export function convertCssVariables(
    input: ConvertCSSVariablesInput,
    selector: string
) {
    const dark = cssVariablesObjectToString(input.dark);
    const darkForced = dark
        ? wrapWithSelector(`${selector}[data-slab-color-scheme="dark"]`, dark)
        : '';

    const light = cssVariablesObjectToString(input.light);
    const lightForced = light ? wrapWithSelector(`${selector}`, light) : '';

    return `${lightForced}${darkForced}`;
}
