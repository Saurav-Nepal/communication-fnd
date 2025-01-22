// const DOCS_PACKAGES = ['demos', 'styles-api'];
import packageJson from '../../package.json';

export function getPackageName(input: string) {
    if (input.startsWith('@')) {
        return input;
    }

    // if (DOCS_PACKAGES.includes(input)) {
    //   return `@docs/${input}`;
    // }

    return `${packageJson.namespace}/${input}`;
}
