import {
    camelToKebabCase,
    isObject,
    isValidString,
    keys,
} from '@slabs/ds-utils';

import { CSSVariables } from '../../../types/css.types';

export type CSSVariablesResolver = (
    theme?: Record<string, any>,
    prefix?: string
) => CSSVariables;

export const cssVariablesResolver: CSSVariablesResolver = (theme) => {
    let result: CSSVariables = {};

    if (theme) {
        keys(theme).forEach((themeKey) => {
            if (isObject(theme[themeKey])) {
                result = {
                    ...result,
                    ...cssVariablesResolver(theme[themeKey]),
                };
                return;
            }
            if (!isValidString(theme[themeKey])) return;
            result[`--${camelToKebabCase(themeKey)}`] = theme[
                themeKey
            ] as string;
        });
    }
    return result;
};
