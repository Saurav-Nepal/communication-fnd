import { useMemo } from 'react';

import { IsEmptyArray } from '@finnoto/design-system';

import { BucketItem } from '../../Types/ageingBucket.types';
import { SortArrayObjectBy } from '../../Utils/common.utils';
import { useUserPreferences } from '../useUserPreferences.hook';

export const useAgeingBucket = (
    bucketKey: string,
    defaultBucket: BucketItem[] = []
) => {
    const [
        [bucket],
        { refetch, isLoading, isSavingPreference, setPreference },
    ] = useUserPreferences(bucketKey);

    const setBucket = (value: BucketItem[]) => {
        return setPreference(bucketKey, JSON.stringify(value));
    };

    const bucketData = useMemo<BucketItem[]>(() => {
        if (isLoading) return [];
        if (IsEmptyArray(bucket))
            return SortArrayObjectBy(defaultBucket, 'start');

        return SortArrayObjectBy(bucket, 'start') as BucketItem[];
    }, [bucket, defaultBucket, isLoading]);

    return {
        bucket: bucketData,
        setBucket,
        isLoading,
        isSavingPreference,
        refetch,
    };
};
