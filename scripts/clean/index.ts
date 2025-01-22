import * as fs from 'fs';
import * as path from 'path';
import { promisify } from 'util';
import { minimatch } from 'minimatch';

const readdir = promisify(fs.readdir);
const rm = promisify(fs.rm);
const unlink = promisify(fs.unlink);

const DIRS_TO_DELETE: string[] = [
    'packages/**/esm',
    'packages/**/cjs',
    'packages/**/lib',
    'dist',
    '.turbo',
    '.next',
    'storybook-static',
];
const EXTENSIONS_TO_DELETE: string[] = ['.tsbuildinfo'];
const IGNORE_DIRS: string[] = [
    '.git',
    '.yarn',
    '.vscode',
    '.storybook',
    '.github',
    'src',
    'public',
    'scripts',
    'node_modules',
];

const COLORS = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    cyan: '\x1b[36m',
    magenta: '\x1b[35m',
} as const;

type ColorKey = keyof typeof COLORS;

function log(message: string, color: ColorKey = 'reset'): void {
    console.log(`${COLORS[color]}${message}${COLORS.reset}`);
}

function getRelativePath(fullPath: string, projectRoot: string): string {
    return path.relative(projectRoot, fullPath);
}

function shouldDeleteDirectory(relativePath: string): boolean {
    return DIRS_TO_DELETE.some((pattern) =>
        minimatch(relativePath, pattern, { matchBase: true, dot: true })
    );
}

interface DeleteResults {
    files: number;
    directories: number;
}

async function deleteMatchingItems(
    dir: string,
    projectRoot: string,
    depth: number = 0,
    dryRun: boolean = false
): Promise<DeleteResults> {
    try {
        const entries = await readdir(dir, { withFileTypes: true });
        let deletedItems: DeleteResults = { files: 0, directories: 0 };

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name);
            const relativePath = getRelativePath(fullPath, projectRoot);

            if (IGNORE_DIRS.includes(entry.name)) {
                // log(`${' '.repeat(depth * 2)}Skipping: ${relativePath}`, 'dim');
                continue;
            }

            if (entry.isDirectory()) {
                if (shouldDeleteDirectory(relativePath)) {
                    if (fullPath === projectRoot) {
                        log(
                            `${' '.repeat(depth * 2)}Skipping project root: ${relativePath}`,
                            'yellow'
                        );
                        continue;
                    }
                    log(
                        `${' '.repeat(depth * 2)}${dryRun ? 'Would delete' : 'Deleting'} directory: ${relativePath}`,
                        'yellow'
                    );
                    if (!dryRun) {
                        await rm(fullPath, { recursive: true, force: true });
                    }
                    deletedItems.directories++;
                } else {
                    const subResults = await deleteMatchingItems(
                        fullPath,
                        projectRoot,
                        depth + 1,
                        dryRun
                    );
                    deletedItems.files += subResults.files;
                    deletedItems.directories += subResults.directories;
                }
            } else if (
                entry.isFile() &&
                EXTENSIONS_TO_DELETE.includes(path.extname(entry.name))
            ) {
                log(
                    `${' '.repeat(depth * 2)}${dryRun ? 'Would delete' : 'Deleting'} file: ${relativePath}`,
                    'cyan'
                );
                if (!dryRun) {
                    await unlink(fullPath);
                }
                deletedItems.files++;
            }
        }

        return deletedItems;
    } catch (error) {
        log(
            `Error processing ${getRelativePath(dir, projectRoot)}: ${(error as Error).message}`,
            'red'
        );
        return { files: 0, directories: 0 };
    }
}

async function main() {
    try {
        const args = process.argv.slice(2);
        const dryRun = args.includes('--dry-run') || args.includes('-d');

        const projectRoot = process.cwd();
        log(`Project root: ${projectRoot}`, 'bright');
        log(
            `Starting cleanup process... ${dryRun ? '(Dry Run)' : ''}`,
            'bright'
        );

        const startTime = Date.now();
        const results = await deleteMatchingItems(
            projectRoot,
            projectRoot,
            0,
            dryRun
        );
        const endTime = Date.now();

        log('\nCleanup summary:', 'bright');
        log(
            `  ${dryRun ? 'Files that would be deleted' : 'Deleted files'}: ${results.files}`,
            'cyan'
        );
        log(
            `  ${dryRun ? 'Directories that would be deleted' : 'Deleted directories'}: ${results.directories}`,
            'yellow'
        );
        log(`  Total time: ${(endTime - startTime) / 1000} seconds`, 'magenta');

        log(
            `\nCleanup ${dryRun ? 'simulation' : 'operation'} complete!`,
            'bright'
        );

        if (dryRun) {
            log(
                '\nThis was a dry run. No files were actually deleted.',
                'green'
            );
            log(
                'To perform the actual deletion, run the script without the --dry-run flag.',
                'green'
            );
        }
    } catch (error) {
        log('An error occurred during cleanup:', 'bright');
        log((error as Error).message, 'red');
    }
}

main();
