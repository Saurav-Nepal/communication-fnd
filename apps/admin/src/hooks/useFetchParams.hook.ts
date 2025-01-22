import { useMemo } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { ObjectDto } from '@/types';

export const useFetchParams = (): {
    params: ObjectDto;
    queryParams: ObjectDto;
    queryString: ObjectDto;
    searchParams: ObjectDto;
    isRouteReady: boolean;
    [x: string]: any;
} => {
    const params = useParams();
    const urlSearchParams = useSearchParams();

    const searchParams = useMemo(() => {
        const params = {};
        for (const [key, value] of urlSearchParams.entries()) {
            params[key] = value;
        }
        return params;
    }, [urlSearchParams]);

    return {
        ...params,
        ...searchParams,
        params,
        searchParams,
        queryParams: { ...params, ...searchParams },
        queryString: { ...params, ...searchParams },
        isRouteReady: true,
    };
};
