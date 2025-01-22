import path from 'node:path';
import fs from 'fs-extra';

import { getPath } from '../utils/get-path';

export async function locatePackage(packageName: string) {
    const packagePath = path.join(getPath('packages'), packageName);
    const exists = await fs.pathExists(packagePath);
    return exists ? packagePath : null;
}
