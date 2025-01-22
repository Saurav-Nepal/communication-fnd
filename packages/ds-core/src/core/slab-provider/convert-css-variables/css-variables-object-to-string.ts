import { CSSVariables } from '../../../types/css.types';

export function cssVariablesObjectToString(variables: CSSVariables) {
    return Object.entries(variables)
        .map(([name, value]) => `${name}: ${value};`)
        .join('');
}
