import { parse } from 'papaparse';

import { ObjectDto } from '@finnoto/core';

export const getCsvHeadings = async (file: File) => {
    const { results } = (await parseCSVFile(file, {
        header: true,
        preview: 5,
    })) as ObjectDto;

    if (results) {
        return results.meta?.fields;
    }

    return false;
};

export const parseCSVFile = (
    file: File,
    options?: { preview?: number; header?: boolean }
) => {
    return new Promise((resolve, reject) => {
        parse(file as any, {
            header: options?.header,
            preview: options?.preview || 0,
            complete(results, file) {
                resolve({ results, file });
            },
            error(error, file) {
                reject({ error, file });
            },
        });
    });
};
