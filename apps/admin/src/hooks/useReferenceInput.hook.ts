import { useCallback, useEffect, useMemo, useState } from 'react';

import { isValidString } from '@slabs/ds-utils';

import { GLOBAL } from '@/constants/global.constants';
import { Get } from '@/services';
import { ReferenceInputProps } from '@/types';
import {
    ChangeRecordToData,
    ExtractUrlFromColumnDefinition,
} from '@/utils/assistGeneric.utils';

const useReferenceInput = ({
    value: propsValue,
    dict,
}: Omit<ReferenceInputProps, 'onChange'>) => {
    const [value, setValue] = useState<any>();

    const queryUrl = useMemo(
        () => ChangeRecordToData(ExtractUrlFromColumnDefinition(dict)),
        [dict]
    );

    const fields = useMemo(
        () =>
            (
                dict.reference_model?.display_column ||
                dict.display_column ||
                'name'
            ).split(','),
        [dict]
    );

    useEffect(() => {
        if (value || !propsValue) return;

        initValue();
    }, [propsValue, dict]);

    const initValue = useCallback(async () => {
        if (!propsValue) return;

        let query = '?query=id=' + propsValue;

        if (queryUrl?.includes('query')) {
            query = ' and id=' + propsValue;
        }

        const options = await loadContent(queryUrl, query);
        setValue(options.pop());
    }, [propsValue, queryUrl]);

    const getOptions = useCallback(
        async (input: string, callback: (options: any) => void) => {
            if (!isValidString(input)) return callback([]);

            let query = '?query=' + fields[0] + " LIKE '*" + input + "*'";

            if (dict.sorting_type) {
                query =
                    `?query=${dict.sorting_type}` +
                    ' and ' +
                    fields[0] +
                    " LIKE '*" +
                    input +
                    "*'";
            }

            if (queryUrl?.includes('query')) {
                query = ' and ' + fields[0] + " LIKE '*" + input + "*'";
            }

            const options = await loadContent(queryUrl, query);
            callback(options);
        },
        [propsValue, dict, queryUrl]
    );

    const loadContent = async (url, query) => {
        if (!url) return [];
        const { success, response } = await Get({
            url: url + query,
            urlPrefix: GLOBAL.ROUTE_URL,
        });

        if (success) {
            return response.map((entry) => ({
                ...entry,
                value: entry.id,
                label: entry.name,
            }));
        }

        return [];
    };

    return { value, fields, queryUrl, getOptions, loadContent };
};

export { useReferenceInput };
