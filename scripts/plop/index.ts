import path from 'node:path';
import chalk from 'chalk';
import { execa } from 'execa';
import fs from 'fs-extra';
import { argv } from 'yargs';

import packageJson from '../../package.json';
import { getPath } from '../utils/get-path';
import { createLogger } from '../utils/signale';

const logger = createLogger('plop');

const _argv: any = argv;
const name = _argv._[0];
const description = _argv._[1];
const packageName = packageJson.namespace
    ? `${packageJson.namespace}/${name}`
    : name;

if (!name) {
    logger.error('Package name is missing');
    process.exit(1);
}

if (!description) {
    logger.error('Package description is missing');
    process.exit(1);
}

const packagePath = path.join(getPath('packages'), name);

if (fs.existsSync(packagePath)) {
    logger.error(`Package ${chalk.cyan(name)} already exists`);
    process.exit(1);
}

const index = fs.readFileSync(
    getPath('scripts/plop/templates/src/index.ts'),
    'utf-8'
);
const npmignore = fs.readFileSync(
    getPath('scripts/plop/templates/.npmignore'),
    'utf-8'
);
const packageJsonFile = fs.readFileSync(
    getPath('scripts/plop/templates/package.json'),
    'utf-8'
);
const readme = fs.readFileSync(
    getPath('scripts/plop/templates/README.md'),
    'utf-8'
);
const tsconfig = fs.readFileSync(
    getPath('scripts/plop/templates/tsconfig.json'),
    'utf-8'
);
const tsconfigBuild = fs.readFileSync(
    getPath('scripts/plop/templates/tsconfig.build.json'),
    'utf-8'
);

function replacePlaceholders(content: string) {
    return content
        .replaceAll('{{package}}', name)
        .replaceAll('{{packageName}}', packageName)
        .replaceAll('{{namespace}}', packageJson.namespace)
        .replaceAll('{{description}}', description);
}

fs.ensureDirSync(packagePath);
fs.mkdirSync(path.join(packagePath, 'src'));
fs.writeFileSync(
    path.join(packagePath, 'src/index.ts'),
    replacePlaceholders(index)
);
fs.writeFileSync(
    path.join(packagePath, '.npmignore'),
    replacePlaceholders(npmignore)
);
fs.writeFileSync(
    path.join(packagePath, 'package.json'),
    replacePlaceholders(packageJsonFile)
);
fs.writeFileSync(
    path.join(packagePath, 'README.md'),
    replacePlaceholders(readme)
);
fs.writeFileSync(
    path.join(packagePath, 'tsconfig.json'),
    replacePlaceholders(tsconfig)
);
fs.writeFileSync(
    path.join(packagePath, 'tsconfig.build.json'),
    replacePlaceholders(tsconfigBuild)
);

logger.success(`Package ${chalk.cyan(packageName)} has been created`);

execa('yarn');
