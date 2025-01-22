import path from 'node:path';
import fs from 'fs-extra';
import { minimatch } from 'minimatch';
import { RollupOptions } from 'rollup';
import banner from 'rollup-plugin-banner2';
import esbuild from 'rollup-plugin-esbuild';
import findLost from 'rollup-plugin-lost';
import postcss from 'rollup-plugin-postcss';

import alias, { Alias } from '@rollup/plugin-alias';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

import { getPackagesList } from '../../packages/get-packages-list';
import { getPath } from '../../utils/get-path';
import { ROLLUP_EXCLUDE_USE_CLIENT } from './rollup-exclude-use-client';
import { ROLLUP_EXTERNALS } from './rollup-externals';

export async function createPackageConfig(
    packagePath: string
): Promise<RollupOptions> {
    const packagesList = getPackagesList();
    const packageJson = fs.readJSONSync(path.join(packagePath, 'package.json'));

    const aliasEntries: Alias[] = packagesList.map((pkg) => ({
        find: new RegExp(`^${pkg.packageJson.name}`),
        replacement: path.resolve(pkg.path, 'src'),
    }));
    const plugins = [
        nodeResolve({ extensions: ['.ts', '.tsx', '.js', '.jsx'] }),
        commonjs({
            // This is needed to handle the Cleave.js case
            esmExternals: true,
            requireReturnsDefault: 'auto',
            transformMixedEsModules: true,
        }),
        esbuild({
            sourceMap: false,
            tsconfig: getPath('tsconfig.json'),
        }),
        alias({ entries: aliasEntries }),
        replace({ preventAssignment: true }),
        postcss({
            extract: true,
            minimize: true,
        }),
        banner((chunk) => {
            if (
                !ROLLUP_EXCLUDE_USE_CLIENT.some((expression) =>
                    minimatch(chunk.facadeModuleId ?? '', `**/${expression}`)
                )
            ) {
                return "'use client';\n";
            }

            return undefined;
        }),
        findLost({
            include: [path.resolve(packagePath, 'src/**/**/*.{ts,tsx}')],
            exclude: [
                'node_modules/**',
                path.resolve(packagePath, 'src/**/{index,types}.{ts,tsx}'),
                path.resolve(
                    packagePath,
                    'src/**/*.{types,test,story}.{ts,tsx}'
                ),
            ],
        }),
    ];

    return {
        input: packageJson.entry
            ? path.resolve(packagePath, packageJson.entry)
            : path.resolve(packagePath, 'src/index.ts'),
        output: [
            {
                format: 'es',
                entryFileNames: '[name].mjs',
                dir: path.resolve(packagePath, 'esm'),
                preserveModules: true,
                sourcemap: true,
            },
            {
                format: 'cjs',
                entryFileNames: '[name].cjs',
                dir: path.resolve(packagePath, 'cjs'),
                preserveModules: true,
                sourcemap: true,
            },
        ],
        external: ROLLUP_EXTERNALS,
        plugins,
    };
}
