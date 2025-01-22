import path from 'node:path';

export function getPath(filePath: string) {
    return path.join(path.resolve(process.cwd(), '../../'), filePath);
}

export function getPaths(filePaths: string[]) {
    return filePaths.map(getPath);
}
