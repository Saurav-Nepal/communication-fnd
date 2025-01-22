import packageJson from '../../../package.json';
import {
    getPackagesList,
    getSlabsPackagesList,
} from '../../packages/get-packages-list';

export const ROLLUP_EXTERNALS = [
    ...getPackagesList().map((pkg) => pkg.packageJson.name!),
    ...getSlabsPackagesList().flatMap((pkg) => [
        ...Object.keys({
            ...(pkg.packageJson.dependencies ?? {}),
            ...(pkg.packageJson.peerDependencies ?? {}),
        }),
    ]),
    ...Object.keys({
        ...packageJson.devDependencies,
        ...packageJson.dependencies,
    }),
];
