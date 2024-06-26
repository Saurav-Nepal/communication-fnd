import Fuse from 'fuse.js';
import { useMemo, useState } from 'react';
import { ObjectDto } from '../backend/Dtos';
import { IsValidString } from '../Utils/common.utils';

export const useLocalSearch = (
    data: ObjectDto[],
    weight: string | { [key: string]: number },
    threshold: number = 0.1
) => {
    const [searchQuery, setSearchQuery] = useState('');

    const weightArray = useMemo(() => {
        if (typeof weight === 'string') return [weight];

        return Object.keys(weight).map((key) => ({
            name: key,
            weight: weight[key],
        }));
    }, [weight]);

    const searchResult = useMemo(() => {
        if (!IsValidString(searchQuery)) return data;
        const fuse = new Fuse(data, {
            keys: weightArray,
            threshold,
            includeScore: true,
        });

        const searchResult = fuse.search(searchQuery);
        return searchResult.flatMap((result) => result.item);
    }, [data, weightArray, threshold, searchQuery]);

    return { searchQuery, setSearchQuery, searchResult };
};
